HTMLElement.prototype.tooltip = function () {
    const bgColor = '#ddd';
    const textColor = '#000';
    this.onmouseover = function (e) {
        document.querySelectorAll(".tooltip-custom").forEach(element => {
            element.parentNode.removeChild(element);
        });

        let data = e.target.getAttribute("data-tooltip");

        if (!data) return;

        let pos = e.target.getBoundingClientRect(),
            div = document.createElement("div"),
            divData = document.createElement("div");

        div.innerHTML = "";
        divData.innerHTML = data;

        divData.style.cssText = "position:absolute;overflow:hidden;font-size:14px;padding:15px;max-width:250px;min-width:250px;border-radius:5px;box-shadow:0 0 15px 2px " + bgColor + ";background-color:" + bgColor + ";color:" + textColor + ";"

        if (document.body.clientHeight / 2 < pos.bottom) {
            div.style.cssText = "position:fixed;z-index:2147483647;opacity:0;transition:opacity 0.6s;" +
                "top:" + (pos.top - 15) + "px;" +
                "left:" + ((pos.left + (pos.width / 2) - 10) + "px;") +
                "border: 10px solid transparent;margin:auto;pointer-events:none;border-top-color:" + bgColor + ";";

            divData.style.bottom = "10px";
        } else {
            div.style.cssText = "position:fixed;z-index:2147483647;opacity:0;transition:opacity 0.6s;" +
                "top:" + (pos.top + pos.height - 5) + "px;" +
                "left:" + ((pos.left + (pos.width / 2) - 10) + "px;") +
                "border: 10px solid transparent;margin:auto;pointer-events:none;border-bottom-color:" + bgColor + ";";

            divData.style.top = "10px";
        }
        div.classList.add("tooltip-custom");

        div.appendChild(divData);
        document.body.appendChild(div);

        let posDivData = divData.getBoundingClientRect(),
            posDiv = div.getBoundingClientRect();

        if (posDiv.left < (posDivData.width / 2)) {
            divData.style.left = "-20px";
        } else if (document.body.offsetWidth - posDiv.right < (posDivData.width / 2)) {
            divData.style.left = (posDivData.width * -1 + 20) + "px";
        } else {
            divData.style.left = (posDivData.width * -1 / 2) + "px";
        }

        div.style.opacity = "1";

    }

    this.onclick = this.onmouseover;

    this.onmouseout = function (e) {
        document.querySelectorAll(".tooltip-custom").forEach(element => {
            element.parentNode.removeChild(element);
        });
    }

}

document.body.tooltip();
