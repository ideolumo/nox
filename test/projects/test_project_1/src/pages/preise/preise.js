window.onload = function() {
    $(".month-button").click(function() {
        let el = $(this);
        $(".month-button.selected").removeClass('selected');
        let duration = el.attr('id');

        el.addClass('selected');
        //console.log(containerPrices);
        
        for(let key in containerPrices) {
            let pb = $('.price_box#'+key);
            //console.log(containerPrices[key], key, duration);
            let preis_vorort = containerPrices[key].locally[duration];
            let preis_aussen = containerPrices[key].outdoor[duration];
            let preis_innen = containerPrices[key].indoor[duration];

            pb.find('.innen .middle-price').text(preis_aussen);
            pb.find('.other-prices .vorort').text(preis_vorort + ' €/Monat*');
            pb.find('.other-prices .innenlagernd').text((preis_innen === null ? ' nicht möglich' : ' '+preis_innen + ' €/Monat*'));

            let pb_a = pb.find('a.button');
            let new_href = 'kontakt?box=' + key + '&duration=' + duration + '#start-kontakt';
            pb.find('a.button').attr('href', new_href);
        }
    });
};
