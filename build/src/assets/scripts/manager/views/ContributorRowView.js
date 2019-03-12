import extend from 'lodash/extend';
import log from 'loglevel';
import map from 'lodash/map';

import * as DynamicSelect2 from '../utils/DynamicSelect2';
import BaseView from './BaseView';
import hb_template from '../hb_templates/contributorTabRow.hbs';
import optionTemplate from '../hb_templates/contributorTabRowOption.hbs';

import 'select2';
import 'backbone.stickit';


export default BaseView.extend({
    bindings : {
        '.affiliation-input' : {
            observe : 'affiliations',
            onGet : function(value) {
                let displayText;
                if (value && value.length > 0) {
                    const stagingText = map(value, 'text');
                    displayText = stagingText.join(', ');
                } else {
                    displayText = '';
                }
                return displayText;
            }
        }
    },

    events : {
        'select2:select .contributor-type-input' : 'selectType',
        'select2:select .contributor-name-input' : 'selectName',
        'click .delete-row' : 'deleteRow',
        'click .edit-contributor-link' : 'clickEditLink',
        'updateOrder .contributor-row-container' : 'updateOrder'
    },

    template : hb_template,

    optionTemplate : optionTemplate,

    /*
     * @constructs
     * @param {Object} options
     *     @prop {String} el - jquery selector where view will be rendered
     *     @prop {PublicationContributorModel} model
     *     @prop {PublicationContributorCollection} collection
     */
     initialize : function() {
        BaseView.prototype.initialize.apply(this, arguments);

        this.context.contributorId = this.model.get('contributorId');
        this.context.scriptRoot = window.CONFIG.scriptRoot;

        this.listenTo(this.model, 'change:corporation', this.updateType);
        this.listenTo(this.model, 'change:text', this.updateName);
        this.listenTo(this.model, 'sync', this.updateRow);
    },

    render : function() {
        const self = this;
        const DEFAULT_SELECT2_OPTIONS = {
            theme : 'bootstrap'
        };
        BaseView.prototype.render.apply(this, arguments);

        this.stickit();

        //Initialize select2's
        this.$('.contributor-type-input').select2(DEFAULT_SELECT2_OPTIONS);
        this.updateType();

        this.$('.contributor-name-input').select2(DynamicSelect2.getSelectOptions({
            lookupType: function () {
                return self.model.get('corporation') ? 'corporations' : 'people';
            },
            subgroups: {
                queryParameter: 'preferred',
                nameAndValues: [{
                    name: 'Preferred',
                    value: 'true'
                }, {
                    name: 'Not preferred',
                    value: 'false'
                }]
            }
        }, extend({minimumInputLength: 2}, DEFAULT_SELECT2_OPTIONS)));
        this.updateName();
        return this;
    },

    /*
     * DOM Event handlers
     */
     selectType : function(ev) {
        this.model.set('corporation', ev.currentTarget.value === 'corporations');
    },

    selectName : function(ev) {
        this.model.set('contributorId', ev.currentTarget.value);
        this.model.fetch();
    },

    updateOrder : function(ev, newIndex) {
        log.debug('In updateOrder: contributor ' + this.model.get('text') + ', newRank ' + (newIndex + 1));
        this.collection.updateModelRank(this.model, newIndex + 1);
    },

    deleteRow : function() {
        log.debug('Delete contributor ' + this.model.get('text'));
        this.collection.remove(this.model);
    },

    clickEditLink : function() {
        const url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port +
            window.location.pathname + '#contributor' +
            (this.model.has('contributorId') ? '/' + this.model.get('contributorId') : '');
        window.open(url, '_blank');
    },

    /*
     * Model event handlers
     */

     updateType : function() {
        const $select = this.$('.contributor-type-input');
        const corporation = this.model.get('corporation');
        if (corporation) {
            $select.val('corporations').trigger('change');
        } else {
            $select.val('people').trigger('change');
        }
    },

    updateName : function() {
        const $select = this.$('.contributor-name-input');
        const id = this.model.get('contributorId');

        if (id) {
            if ($select.find('option[value="' + id + '"]').length === 0) {
                $select.append(this.optionTemplate(this.model.attributes));
            }
            $select.val(this.model.get('contributorId')).trigger('change');
        } else {
            $select.val('').trigger('change');
        }
    }
});
