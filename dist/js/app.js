document.addEventListener("DOMContentLoaded", function () {
    let counter = document.querySelector("#card-basket-counter__number");
    let basket_counter_up = document.querySelector('#card-basket-counter-up');
    let basket_counter_down = document.querySelector('#card-basket-counter-down');

    basket_counter_up.addEventListener("click", function () {
        let current = parseInt(counter.innerText) + 1;
        counter.innerHTML = current;
    });

    basket_counter_down.addEventListener("click", function () {
        let current = parseInt(counter.innerText) - 1;

        if(current < 1) return;
        counter.innerHTML = current
    });

    const slider = new Slider("#slider", {
        speed: 400,
        ease: "cubic-bezier(0, 0.69, 0.19, 1)"
    });

});