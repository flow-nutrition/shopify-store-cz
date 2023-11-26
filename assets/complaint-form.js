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
const form = document.querySelector("#complaint-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const product = document.querySelector("#product").value;
    const name = document.querySelector("#complaint-form-name").value;
    const email = document.querySelector("#complaint-form-email").value;
    const accountNumber = document.querySelector("#account-number").value;
    const orderNumber = document.querySelector("#order-number").value;
    const complaintReason = document.querySelector("#complaint-reason").value;
    const shouldImprove = document.querySelector("#should-improve").value;
    const starCounter = 1;
    const complaint = "Číslo účtu: " + accountNumber + "  |  Číslo objednávky: " + orderNumber+ "  |  Důvod reklamace: "  + complaintReason + "  |  Co bychom měli zlepšit?: "  + shouldImprove;


    if (name && email && product && accountNumber && orderNumber && complaintReason && shouldImprove) {
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
            "Reklamace"
        )}&review%5Bbody%5D=${encodeURIComponent(
            complaint
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
        document.querySelector("#complaint-form-name").value = "";
        document.querySelector("#complaint-form-email").value = "";
        document.querySelector("#account-number").value = "";
        document.querySelector("#order-number").value = "";
        document.querySelector("#complaint-reason").value = "";
        document.querySelector("#should-improve").value = "";
        document.querySelector(".complaint").value = "";
        document.querySelector(".success").classList.add("active");
    } else {
        document.querySelector(".success").classList.remove("active");
        document.querySelector(".fail").classList.add("active");
    }
});