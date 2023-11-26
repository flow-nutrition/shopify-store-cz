const select = document.querySelector("#form-select");
const input = select.querySelector("input");

//Product select
select.addEventListener("click", function (e) {
    select.setAttribute("tabindex", "1");
    select.focus();

    e.currentTarget.classList.add("active");
    e.currentTarget.querySelector(".select-list").classList.add("active");
});
select.addEventListener("focusout", function (e) {
    e.currentTarget.classList.remove("active");
    e.currentTarget.querySelector(".select-list").classList.remove("active");
});
document.querySelectorAll(".select-list li").forEach((item) => {
    item.addEventListener("click", function (e) {
        e.stopPropagation();
        document.querySelector(".select-head").innerHTML =
            e.currentTarget.innerHTML;
        input.value = e.currentTarget.id;
        select.classList.remove("active");
        select.querySelector(".select-list").classList.remove("active");
    });
});

//Form submission
const form = document.querySelector("#review-form");
const starInputs = document.querySelectorAll(".star")
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const product = document.querySelector("#product").value;
    const fname = document.querySelector("#review-form-name").value;
    const lname = document.querySelector("#review-form-lname").value;
    const email = document.querySelector("#review-form-email").value;
    const starCounter = document.querySelector("input[name=flex-star]:checked").value;
    const review = document.querySelector(".review").value;
    const name = fname + " " + lname;

    if (product && name && lname && email && starCounter && review) {
        document.querySelector(".success").classList.add("active");
        document.querySelector(".fail").classList.remove("active");

        //Test POST request to Shopify review app on specific product
        const url = `https://productreviews.shopifycdn.com/proxy/v4/reviews/create?review%5Brating%5D=${encodeURIComponent(
            starCounter
        )}&product_id=${encodeURIComponent(
            product
        )}&review%5Bauthor%5D=${encodeURIComponent(
            name
        )}&review%5Bemail%5D=${encodeURIComponent(
            email
        )}&review%5Btitle%5D=${encodeURIComponent(
            "Recenze"
        )}&review%5Bbody%5D=${encodeURIComponent(
            review
        )}&shop=${encodeURIComponent("mindflow-cz.myshopify.com")}`;
        fetch(url, {
            method: "POST",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        //Reset form to intial state
        document.querySelector("#product").value = null;
        document.querySelector(".select-head").innerHTML =
            "<span>Vyberte produkt</span>";
        document.querySelector("#review-form-name").value = "";
        document.querySelector("#review-form-lname").value = "";
        document.querySelector("#review-form-email").value = "";
        document.querySelector("input[name=flex-star]:checked").value = false;
        starInputs.forEach((item) => {
            item.checked = false;
        });
        document.querySelector(".review").value = "";
        document.querySelector(".success").classList.add("active");
    } else {
        document.querySelector(".success").classList.remove("active");
        document.querySelector(".fail").classList.add("active");
    }
});