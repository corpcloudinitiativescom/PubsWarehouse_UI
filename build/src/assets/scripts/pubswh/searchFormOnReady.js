import AdvancedSearchForm from './advancedSearchForm';


$(document).ready(function() {
    // Constants for link text
    var SHOW_SEARCH = 'Show Advanced Search';
    var HIDE_SEARCH = 'Clear Advanced Search';

    var initialSearchRows = [];
    var $form = $('#search-pubs-form');
    var $showHideSearchBtn = $form.find('#show-hide-advanced-search-btn');
    var $categorySelect = $form.find('.search-category-select');
    var $clearSearchBtn = $form.find('.clear-search-btn');
    var $qSearch = $form.find('input[name="q"]');
    var $advancedSearchDiv = $form.find('.advanced-search-div');
    var advancedSearchForm;

    var enableCategory = function(name) {
        $categorySelect.find('option[value="' + name + '"]').prop('disabled', false);
        $categorySelect.select2();
    };

    // Retrieve information to create the initial search rows from the query parameters and search category list.
    if (CONFIG.requestArgs !== {}) {
        $.each(CONFIG.requestArgs, function (name, value) {
            var $thisOption = $categorySelect.find('option[value="' + name + '"]');

            $thisOption.prop('disabled', !$thisOption.data('allow-multi'));
            if ($thisOption.length) {
                value.forEach(function(v) {
                    initialSearchRows.push({
                        name: name,
                        displayName: $thisOption.html(),
                        inputType: $thisOption.data('input-type'),
                        value: v,
                        placeholder: $thisOption.data('placeholder'),
                        lookup: $thisOption.data('lookup')
                    });
                });
            }
        });
    }
    advancedSearchForm = new AdvancedSearchForm({
        $container : $form.find('.advanced-search-container'),
        $mapContainer: $form.find('.map-search-container'),
        initialRows : initialSearchRows,
        deleteRowCallback: enableCategory
    });

    // Show/hide advanced search and add click handler for toggle link
    if (initialSearchRows.length > 0) {
        $showHideSearchBtn.html(HIDE_SEARCH);
        $advancedSearchDiv.attr('hidden', false);
    } else {
        $showHideSearchBtn.html(SHOW_SEARCH);
        $advancedSearchDiv.prop('hidden', true);
    }
    $showHideSearchBtn.click(function() {
        if ($advancedSearchDiv.attr('hidden')) {
            $showHideSearchBtn.html(HIDE_SEARCH);
            $advancedSearchDiv.attr('hidden', false);
        } else {
            $showHideSearchBtn.html(SHOW_SEARCH);
            advancedSearchForm.deleteAllRows();
            $categorySelect.find('option').prop('disabled', false);
            $categorySelect.select2();
            $advancedSearchDiv.attr('hidden', true);
        }
    });

    // Set up advanced search category select
    $categorySelect.select2();
    $categorySelect.on('select2:select', function() {
        var $selectedOption = $(this).find('option:selected');
        advancedSearchForm.addRow({
            name: $selectedOption.val(),
            displayName: $selectedOption.html(),
            inputType: $selectedOption.data('inputType'),
            placeholder: $selectedOption.data('placeholder'),
            lookup: $selectedOption.data('lookup')
        });
        $selectedOption.prop('selected', false);
        $selectedOption.prop('disabled', !$selectedOption.data('allow-multi'));
        $categorySelect.select2();
    });

    // Add click handler for clear search terms
    $clearSearchBtn.click(function() {
        $qSearch.val('');
    });
});
