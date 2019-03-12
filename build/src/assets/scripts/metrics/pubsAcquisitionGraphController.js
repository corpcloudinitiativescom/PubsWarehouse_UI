import partial from 'lodash/partial';

import { batchFetchMonthlyPastYear, batchFetchPast30Days } from './analyticsData.js';
import { createGraph } from './analyticsGraph';

const DAY_FORMAT = 'MMM DD YYYY';
const MONTH_FORMAT = 'MMM YYYY';

var recentSearchesDiv = document.getElementById('recent-searches-container');
var yearSearchesDiv = document.getElementById('year-searches-container');
var recentSearchReferralsDiv = document.getElementById('recent-search-referrals-container');
var yearSearchReferralsDiv = document.getElementById('year-search-referrals-container');
var recentSearchDirectDiv = document.getElementById('recent-search-direct-container');
var yearSearchDirectDiv = document.getElementById('year-search-direct-container');
var recentSearchSocialDiv = document.getElementById('recent-search-social-container');
var yearSearchSocialDiv = document.getElementById('year-search-social-container');
var recentSearchEmailDiv = document.getElementById('recent-search-email-container');
var yearSearchEmailDiv = document.getElementById('year-search-email-container');

var sessionsMetric = {expression : 'ga:sessions'};

var organicSearchFilter = {
    dimensionName : 'ga:medium',
    operator: 'EXACT',
    expressions: ['organic']
};
var referralSearchFilter = {
    dimensionName : 'ga:medium',
    operator: 'EXACT',
    expressions:[ 'referral']
};
var directSessionsFilter = {
    dimensionName : 'ga:source',
    operator: 'EXACT',
    expressions: ['(direct)']
};
var twitterFilter = {
    dimensionName: 'ga:socialNetwork',
    operator: 'EXACT',
    expressions: ['Twitter']
};
var emailFilter = {
    dimensionName: 'ga:medium',
    operator: 'EXACT',
    expressions: ['email']
};

var metricsAndDimFilters = [
    {
        metrics: [sessionsMetric],
        dimFilters : [{filters: organicSearchFilter}]
    }, {
        metrics: [sessionsMetric],
        dimFilters: [{filters: referralSearchFilter}]
    }, {
        metrics: [sessionsMetric],
        dimFilters: [{filters: directSessionsFilter}]
    }, {
        metrics: [sessionsMetric],
        dimFilters: [{filters: twitterFilter}]
    }, {
        metrics: [sessionsMetric],
        dimFilters: [{filters: emailFilter}]
    }
];

var transformToGraphData = function(metricName, row) {
    return [row.date.toDate(), parseInt(row[metricName])];
};
var transformToSessisonsData = partial(transformToGraphData, sessionsMetric.expression);

// When the two calls to GA where made simultaneously, frequently only one of the calls worked.
// Therefore, we are waiting until the first call returns before making the second request.
var monthlyDataPromise = batchFetchMonthlyPastYear(metricsAndDimFilters);

monthlyDataPromise
    .done(function(data) {
        var organicData = data[0].map(transformToSessisonsData);
        var referralData = data[1].map(transformToSessisonsData);
        var directData = data[2].map(transformToSessisonsData);
        var twitterData = data[3].map(transformToSessisonsData);
        var emailData = data[4].map(transformToSessisonsData);

        createGraph(yearSearchesDiv, organicData, {
            ylabel: 'Organic Searches',
            title: 'Organic searches per month',
            dateFormat: MONTH_FORMAT
        });
        createGraph(yearSearchReferralsDiv, referralData, {
            ylabel: 'Referral Sessions',
            title: 'Referrals per month',
            dateFormat: MONTH_FORMAT
        });
        createGraph(yearSearchDirectDiv, directData, {
            ylabel: 'Direct Sessions',
            title: 'Direct sessions per month',
            dateFormat: MONTH_FORMAT
        });
        createGraph(yearSearchSocialDiv, twitterData, {
            ylabel: 'Twitter Sessions',
            title: 'Twitter sessions per month',
            dateFormat: MONTH_FORMAT
        });
        createGraph(yearSearchEmailDiv, emailData, {
            ylabel: 'Sessions from emails',
            title: 'Sessions from emails per month',
            dateFormat: MONTH_FORMAT
        });
    })
    .fail(function(response) {
        yearSearchesDiv.innerHTML = response.responseJSON.error.message;
    })
    .always(function() {
        batchFetchPast30Days(metricsAndDimFilters)
            .done(function (data) {
                var organicData = data[0].map(transformToSessisonsData);
                var referralData = data[1].map(transformToSessisonsData);
                var directData = data[2].map(transformToSessisonsData);
                var twitterData = data[3].map(transformToSessisonsData);
                var emailData = data[4].map(transformToSessisonsData);

                createGraph(recentSearchesDiv, organicData, {
                    ylabel: 'Organic Searches',
                    title: 'Organic searches per day',
                    dateFormat: DAY_FORMAT
                });
                createGraph(recentSearchReferralsDiv, referralData, {
                    ylabel: 'Referral Sessions',
                    title: 'Referrals per day',
                    dateFormat: DAY_FORMAT
                });
                createGraph(recentSearchDirectDiv, directData, {
                    ylabel: 'Direct Sessions',
                    title: 'Direct sessions per day',
                    dateFormat: DAY_FORMAT
                });
                createGraph(recentSearchSocialDiv, twitterData, {
                    ylabel: 'Twitter Sessions',
                    title: 'Twitter sessions per day',
                    dateFormat: DAY_FORMAT
                });
                createGraph(recentSearchEmailDiv, emailData, {
                    ylabel: 'Sessions from emails',
                    title: 'Sessions from emails per day',
                    dateFormat: DAY_FORMAT
                });
            })
            .fail(function(response) {
                recentSearchesDiv.innerHTML = response.responseJSON.error.message;
            });

    });
