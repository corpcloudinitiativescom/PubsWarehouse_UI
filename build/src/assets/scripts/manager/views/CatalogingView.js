import BaseView from './BaseView';
import hb_template from '../hb_templates/cataloging.hbs';

import 'eonasdan-bootstrap-datetimepicker';
import 'backbone.stickit';


export default BaseView.extend({
    template : hb_template,

    events : {
        // To set the model value from a datetimepicker, handle the event of the input's div
        'dp.change #temporal-start-input-div' : 'changeTemporalStart',
        'dp.change #temporal-end-input-div' : 'changeTemporalEnd'
    },

    bindings : {
        '#prod-desc-input' : 'productDescription',
        '#volume-input' : 'volume',
        '#issue-input' : 'issue',
        '#edition-input' : 'edition',
        '#start-page-input' : 'startPage',
        '#end-page-input' : 'endPage',
        '#num-pages-input' : 'numberOfPages',
        '#online-only-input' : {
            observe : 'onlineOnly',
            onGet : function(value) {
                return value === 'Y';
            },
            onSet : function(val) {
                return val ? 'Y' : 'N';
            }
        },
        '#additional-files-input' : {
            observe : 'additionalOnlineFiles',
            onGet : function(value) {
                return value === 'Y';
            },
            onSet : function(val) {
                return val ? 'Y' : 'N';
            }
        },
        '#temporal-start-input' : 'temporalStart',
        '#temporal-end-input' : 'temporalEnd',
        '#notes-input' : 'notes',
        '#scale-input' : 'scale',
        '#projection-input' : 'projection',
        '#datum-input' : 'datum',
        '#comment-input' : 'publicComments'
    },

    render : function() {
        BaseView.prototype.render.apply(this, arguments);

        //Set up datepickers
        this.$('#temporal-start-input-div').datetimepicker({
            format : 'YYYY-MM-DD'
        });

        this.$('#temporal-end-input-div').datetimepicker({
            format : 'YYYY-MM-DD'
        });

        this.stickit();
        return this;
    },

    /*
     * DOM event handlers
     */
     changeTemporalStart : function(ev) {
        if (ev.date) {
            this.model.set('temporalStart', ev.date.format('YYYY-MM-DD'));
        } else {
            this.model.unset('temporalStart');
        }
    },

    changeTemporalEnd : function(ev) {
        if (ev.date) {
            this.model.set('temporalEnd', ev.date.format('YYYY-MM-DD'));
        } else {
            this.model.unset('temporalEnd');
        }
    }
});
