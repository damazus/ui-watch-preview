class Slider{
    constructor(element, options = {}){
        this.$el = $(element);
        this.defaults = {
            speed: 500,
            easing: 'ease'
        };
        this.$el.css({
            'position': 'relative',
            'overflow-x': 'hidden'
        });
        this.options = {...this.defaults, ...options};
        this.config();
        this.initEvents();
    }

    config(){
        this.$list = this.$el.find('[data-slide-items]');
        this.$items = this.$el.find('[data-slide-item]');
        this.itemsCount = this.$items.length;
        const transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd',
            'MozTransition' : 'transitionend',
            'OTransition' : 'oTransitionEnd',
            'msTransition' : 'MSTransitionEnd',
            'transition' : 'transitionend'
        };
        const transformNames = {
            'WebkitTransform' : '-webkit-transform',
            'MozTransform' : '-moz-transform',
            'OTransform' : '-o-transform',
            'msTransform' : '-ms-transform',
            'transform' : 'transform'
        };
        this.current = 0;
        this.old = 0;
        this.isAnimating = false;
        this.$list.css({
            display: 'flex',
            width: 100 * this.itemsCount + '%',
            transition: 'transform ' + this.options.speed + 'ms ' + this.options.easing
        });
        this.$items.css({width: 100 / this.itemsCount + '%', padding: '0 1px'})
    }

    initEvents(){
        const $dots = this.$el.find('[data-slide-dot] a');

        if($dots.length){
            const self = this;
            $dots.on('click', function () {
                const $me = $(this);
                const $parent = $me.parent();

                $("[data-slide-dot]").removeClass("is-active");
                $parent.addClass("is-active");
                self.jump($parent.index());
            });
        }
    }

    navigate(direction){
        if(this.isAnimating){
            return false
        }

        this.isAnimating = true;
        this.old = this.current;

        if(direction === 'next' && this.current < this.itemsCount - 1){
            ++this.current;
        }else if(direction === 'previous' && this.current > 0){
            --this.current;
        }

        this.slide();
    }

    slide(){
        let translate = -1 * this.current * 100 / this.itemsCount

        this.$list.css({
            transform: 'translate3d('+ translate +'%, 0, 0)'
        });
        this.$list.on('transitionend', () => {
            this.isAnimating = false
            this.options.onTransitionEnd ? this.options.onTransitionEnd() :null
        })
    }

    jump(position) {
        if (position === this.current || this.isAnimating) return false

        this.isAnimating = true;
        this.old = this.current;
        this.current = position;

        this.slide();
    }

    destroy(){
        // remove nav controls

        this.$list.css('width', 'auto');
        this.$list.css('transition', 'none');
        this.$list.css('display', 'block');
        this.$items.css({width: 'auto', padding: '0'})
    }

}