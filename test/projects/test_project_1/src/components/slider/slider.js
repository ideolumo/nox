var slider_images = {};
var slider_positions = {};

window.onload = function() {
    $('.slider > .image > .control_button').click(function() {
        let el = $(this);
        let isLeft = el.hasClass('left');
        let sliderId = el.parent().parent().attr('id');
        let sliderPos = slider_positions[sliderId];
        let sliderLength = slider_images[sliderId].length;
        if(typeof sliderPos == 'undefined') sliderPos = 0;
        
        let newSliderPos = (isLeft ?
            sliderPos - 1 :
            sliderPos + 1) % sliderLength;

        if(newSliderPos < 0) newSliderPos = sliderLength + newSliderPos;

        // Update displayed image
        newSliderImage = slider_images[sliderId][newSliderPos].image;
        el.parent().find('.current_picture').attr('src', newSliderImage);

        // Update active dot
        let dots = el.parent().parent().find('.dots').find('.dot');
        dots[sliderPos].classList.remove('active');
        dots[newSliderPos].classList.add('active');

        slider_positions[sliderId] = newSliderPos;
    });
}
