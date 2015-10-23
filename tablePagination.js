/**
 * Created by kfarris on 9/11/2015.
 */
jq = jQuery.noConflict();
jq.fn.tablePaginate = function( params ){
    var tp = this;


    tp.totalResultsPerPage = params.totalResultsPerPage;
    tp.currentPage = 0;
    tp.numPages = 0;
    tp.$upButton = params.upButton;
    tp.$downButton = params.downButton;
    tp.$table = jq(tp.selector);
    tp.$pageNumberEle = params.pageNumberEle;
    tp.category = tp.$pageNumberEle.text();

    /**
     * binds the repaginate function to the table.
     * repaginate hides the appropriate parts of the table based on
     * the totalResultsPerPage parameter.
     */
    tp.paginate = function(){
        tp.$table.bind('repaginate', function() {
            tp.calculateTotalPages();
            tp.$table.find('tr').hide().slice(tp.currentPage * tp.totalResultsPerPage, (tp.currentPage + 1) * tp.totalResultsPerPage).show();

        });
        tp.$table.trigger('repaginate');
        tp.displayPageNumbers();
    };

    /**
     * Calculates the total number of pages.
     */
    tp.calculateTotalPages = function(){
        var numRows = tp.find('tr').length;
        tp.numPages = Math.ceil(numRows / tp.totalResultsPerPage);

    };

    /**
     *returns the total number of pages
     * @returns {number|*}
     */
    tp.getNumberOfPages = function(){
        return tp.numPages;
    };

    /**
     * returns the current page
     * @returns {number}
     */
    tp.getCurrentPage = function(){
        return tp.currentPage;
    };

    /**
     * displays the page numbers
     */
    tp.displayPageNumbers = function (){
        tp.$pageNumberEle.text(tp.category + ' - (Page ' + (tp.getCurrentPage() + 1) + " of " + tp.getNumberOfPages() + ')');
    };

    /**
     * Moves UP one page
     */
    tp.$table.bind("pageUp",function(){
        if( tp.currentPage < tp.numPages-1 ){
            tp.currentPage ++;
            tp.trigger('repaginate');
        }

        tp.displayPageNumbers();
        tp.togglePageButtons();
    });

    /**
     * Disables and enables paging buttons
     */
    tp.togglePageButtons = function (){
        tp.$upButton.addClass("ui-disabled");
        tp.$downButton.addClass("ui-disabled");

        if(tp.currentPage + 1 > 1){
            tp.$downButton.removeClass("ui-disabled");
        }

        if(tp.currentPage +1 < tp.numPages){
            tp.$upButton.removeClass("ui-disabled");
        }

    };


    /**
     * Moves DOWN one page
     */
    tp.$table.bind("pageDown",function(){
        if( tp.currentPage > 0 ){
            tp.currentPage --;
            tp.trigger('repaginate');
        }

        tp.displayPageNumbers();
        tp.togglePageButtons();
    });



    tp.paginate();
    tp.togglePageButtons();
};

