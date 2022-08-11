HTMLElement.prototype.tooltip = function () {
    let Visible = function (target) {
        let targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom - target.offsetHeight
        },
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right: window.pageXOffset + document.documentElement.clientWidth,
                bottom: window.pageYOffset + document.documentElement.clientHeight
            };

        if (targetPosition.bottom > windowPosition.top &&
            targetPosition.top < windowPosition.bottom &&
            targetPosition.right > windowPosition.left &&
            targetPosition.left < windowPosition.right) {
            return true;
        }
    }
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
            divData = document.createElement("div"),
            divArrow = document.createElement("div");

        div.innerHTML = "";
        divData.innerHTML = data;

        divData.style.cssText = "position:absolute;overflow:hidden;font-size:12px;font-weight:normal;line-height:1;padding:7px 10px;max-width:250px;border-radius:5px;background-color:" + bgColor + ";color:" + textColor + ";word-break: normal;word-spacing: normal;white-space: normal;line-break: auto;word-wrap: break-word;"
        
        div.style.cssText = "position:fixed;z-index:2147483647;opacity:0;transition:opacity 0.6s;width:100%;" +
            "top:" + (pos.top - 3) + "px;" +
            "left:" + ((pos.left + (pos.width / 2) - 7) + "px;") +
            "margin:auto;pointer-events:none;";

        divData.style.bottom = "6px";

        divArrow.style.cssText = "border:6px solid transparent;display:inline-block;pointer-events:none;border-top-color:" + bgColor + ";position:absolute;top:-6px;left:1px;";

        div.classList.add("tooltip-custom");
        div.appendChild(divData);
        div.appendChild(divArrow);
        document.body.appendChild(div);

        if (!Visible(divData)) {
            div.style.cssText = "position:fixed;z-index:2147483647;opacity:0;transition:opacity 0.6s;width:100%;" +
                "top:" + (pos.top + pos.height + 3) + "px;" +
                "left:" + ((pos.left + (pos.width / 2) - 7) + "px;") +
                "margin:auto;pointer-events:none;";

            divData.style.top = "6px";
            divData.style.bottom = "auto";
            divArrow.style.cssText = "border:6px solid transparent;display:inline-block;pointer-events:none;border-bottom-color:" + bgColor + ";position:absolute;top:-6px;";
        }



        let posDivData = divData.getBoundingClientRect(),
            posDiv = div.getBoundingClientRect();

        if (posDiv.left < (posDivData.width / 2)) {
            divData.style.left = "-20px";
        } else if (document.body.offsetWidth - posDiv.right < (posDivData.width / 2)) {
            divData.style.left = (posDivData.width * -1 + 30) + "px";
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
