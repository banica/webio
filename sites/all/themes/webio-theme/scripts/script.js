(function($){
    Drupal.behaviors.webio = {
        attach: function (context, settings) {

            $basepath = settings.basePath;
            $homelink = $('#superfish-1 > li:first-child a');
            $homeactive = $basepath + 'sites/all/themes/webio-theme/images/custom/home_active.png';
            $homenormal = $basepath + 'sites/all/themes/webio-theme/images/custom/home.png';


            if ($homelink) {
                $img = $basepath + 'sites/all/themes/webio-theme/images/custom/home2.png';
                //console.log($img);

                $($homelink).text('');
                $($homelink).append("<img src='" + $img + "' title='Home page' />");
            }

            $('.liquid-nav a').removeAttr('title');
            $('.views-slideshow-controls-text-next a').text('');

            //$('.om-leaf').click(function (){
            $(document).ready( function(){
                $home_menuitem = $('#om-menu-om-main-menu li.first')

                if ($($home_menuitem).hasClass('active')) {
                    $($home_menuitem).find('img').attr('src', $homeactive);
                }
                else {
                    $($home_menuitem).find('img').attr('src', $homenormal);

                }

                var $att= $('.solutions-view-attachment');

                if ($att) {
                    var pathdepth= (document.baseURI.split("/").length);
                    var term = document.baseURI.split("/")[pathdepth-1];
                    $($att).find('div.views-row').removeClass('active');
                    $($att).find('div.views-row-' + term).addClass('active');
                }

                $('#views_slideshow_liquid_slider_main_ddblock_view-block_1').delay(1000).slideDown('slow');

                var $tag = $('#header #block-locale-language-content div.block-content .language-switcher-locale-url');
                $($tag).find('.locale-untranslated').parent().hide();
//                $($tag).find('img').css('width', '25px');
//                $($tag).find('img').parent().contents().filter(function () {
//                    return this.nodeType == 3;
//                }).remove();

            });

        }
    };


    $(document).ready(function(){




    });
})(jQuery);
