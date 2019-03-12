import has from 'lodash/has';
import omit from 'lodash/omit';

import BaseView from './BaseView';
import hbTemplate from '../hb_templates/confirmationDialog.hbs';


export default BaseView.extend({
    template : hbTemplate,

    events : {
        'click .confirm-btn' : 'confirmAction',
        'click .cancel-btn' : 'close'
    },

    render : function() {
        BaseView.prototype.render.apply(this, arguments);
        this.$('.modal').modal({
            show : false
        });
        return this;
    },

    /*
     * @param {String} message - Message to show in confirmation dialog
     * @param {Function} actionFnc - Function with no parameters which gets called when the confirmation button is clicked
     */
     show : function(message, actionFnc) {
        this.actionFnc = actionFnc;
        this.$('.modal-body').html(message);
        this.$('.modal').modal('show');
    },

    close : function() {
        this.$('.modal').modal('hide');
        omit(this, 'actionFnc');
    },

    confirmAction : function() {
        if (has(this, 'actionFnc')) {
            this.actionFnc();
        }
        this.close();
    }
});
