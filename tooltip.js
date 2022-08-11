HTMLElement.prototype.tooltip = function () {
    const bgColor = 'rgba(0, 0, 0, 0.77)';
    const textColor = '#fff';
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

        divData.style.cssText = "position:absolute;overflow:hidden;font-size:14px;padding:3px 10px;max-width:250px;border-radius:5px;background-color:" + bgColor + ";color:" + textColor + ";white-space:nowrap;"

        if (window.innerHeight / 2 < pos.bottom) {
            div.style.cssText = "position:fixed;z-index:2147483647;opacity:0;transition:opacity 0.6s;" +
                "top:" + (pos.top - 8) + "px;" +
                "left:" + ((pos.left + (pos.width / 2) - 7) + "px;") +
                "border: 6px solid transparent;margin:auto;pointer-events:none;border-top-color:" + bgColor + ";";

            divData.style.bottom = "6px";
        } else {
            div.style.cssText = "position:fixed;z-index:2147483647;opacity:0;transition:opacity 0.6s;" +
                "top:" + (pos.top + pos.height - 3) + "px;" +
                "left:" + ((pos.left + (pos.width / 2) - 7) + "px;") +
                "border: 6px solid transparent;margin:auto;pointer-events:none;border-bottom-color:" + bgColor + ";";

            divData.style.top = "6px";
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
