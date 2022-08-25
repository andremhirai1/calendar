class Calendar {

    constructor(className, options = {}) {
        this.options = options;
        this.options.url = options.url || "";
        this.options.parameters = { "month": options.parameters.month || "month", "year": options.parameters.year || "year" };
        this.calendar = document.querySelector(className);
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.renderHeader();
        this.renderBody();
        this.renderCalendar();
        this.changeSpacing();
        this.attachListeners = this.attachListeners.bind(this);
        this.changeSpacing = this.changeSpacing.bind(this);
        this.attachListeners();
    }

    renderCalendar() {
        const firstDayIndex = new Date(this.currentYear, this.currentMonth, 0).getDay() + 1;
        const lastDayIndex = new Date(this.currentYear, this.currentMonth + 1, 0).getDay();
        const prevLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const nextDays = 7 - lastDayIndex;
        let days = "";

        this.headerMonth.innerText = `${this.months[this.currentMonth]}/${this.currentYear}`;
        this.days.innerHTML = "";


        for (let count = firstDayIndex; count > 0; count--) {
            days += `<div class="prev-date">${prevLastDay - count + 1}</div>`;
        }

        for (let count = 1; count <= lastDay; count++) {
            if (count === new Date().getDate() && this.currentMonth === new Date().getMonth() && this.currentYear === new Date().getFullYear()) {
                days += `<div id="date_${count}" class="today">${count}</div>`;
            } else {
                days += `<div id="date_${count}">${count}</div>`;
            }
        }

        for (let count = 1; count < nextDays; count++) {
            days += `<div class="next-date">${count}</div>`;
        }

        this.days.innerHTML = days;

        this.changeSpacing();
    }

    renderHeader() {
        const _header = document.createElement("div");
        _header.classList.add("calendar-header");
        this.renderPrevButton(_header);
        this.renderCalendarMonth(_header);
        this.renderNextButton(_header);
        this.calendar.appendChild(_header);
    }

    renderPrevButton(_header) {
        const _calendar = this;
        const _prevButton = document.createElement("button");

        _prevButton.innerHTML += `<svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.37506 8.89628L0.937561 4.83364L4.37506 0.770996" stroke="black" stroke-width="1.09292" />
                                  </svg>`;
        _prevButton.setAttribute("id", "calendar-prev-button");

        _prevButton.addEventListener("click", () => _calendar.onClickHandler("prev"));
        _header.appendChild(_prevButton);
    }

    renderNextButton(_header) {
        const _calendar = this;
        const _nextButton = document.createElement("button");

        _nextButton.innerHTML += `<svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.624931 8.89628L4.06243 4.83364L0.624931 0.770996" stroke="black" stroke-width="1.09292" />
                                  </svg>`;
        _nextButton.setAttribute("id", "calendar-next-button");
        _nextButton.addEventListener("click", () => _calendar.onClickHandler("next"));
        _header.appendChild(_nextButton);
    }

    renderCalendarMonth(_header) {
        this.months = [];

        for (let month = 0; month < 12; month++) {
            this.months = [...this.months, new Date(2000, month, 1).toLocaleDateString('default', {
                month: 'long',
            })];
        }

        const _span = document.createElement("span");
        _span.innerHTML += this.months[this.currentMonth];
        _header.appendChild(_span);
        this.headerMonth = _span;
    }

    renderBody() {
        const _body = document.createElement("div");
        _body.classList.add("calendar-body");
        this.renderWeekDays(_body);
        this.calendar.appendChild(_body);
        this.body = _body;
    }

    renderWeekDays(_body) {
        const _divWeekDays = document.createElement("div");
        const _divDays = document.createElement("div");
        this.weekdays = [];

        _divWeekDays.classList.add("calendar-weekdays");
        _divDays.classList.add("calendar-days");

        for (let day = 0; day < 7; day++) {
            //Random month and year just to get the order
            this.weekdays = [...this.weekdays, new Date(2002, 3, day).toLocaleDateString('default', {
                weekday: 'narrow',
            })];
        }
        for (const day of this.weekdays) {
            _divWeekDays.innerHTML += `<div>${day}</div>`
        }

        _body.appendChild(_divWeekDays);
        _body.appendChild(_divDays);
        this.days = _divDays;
    }

    changeSpacing() {
        const _calendar = this;
        const weekdays = this.calendar.querySelectorAll(".calendar-weekdays div");
        const days = this.calendar.querySelectorAll(".calendar-days div");


        weekdays.forEach(function (weekday) {
            weekday.style.minWidth = (_calendar.calendar.offsetWidth / 7 - 10) + "px";
        });

        days.forEach(function (day) {
            day.style.minWidth = (_calendar.calendar.offsetWidth / 7 - 10) + "px";
        });
    }

    async onClickHandler(type) {
        if (type === "prev") {
            this.currentMonth = this.currentMonth == 0 ? 11 : this.currentMonth - 1;
            this.currentYear = this.currentMonth == 0 ? this.currentYear - 1 : this.currentYear;
        } else if (type === "next") {
            this.currentMonth = this.currentMonth == 11 ? 0 : this.currentMonth + 1;
            this.currentYear = this.currentMonth == 11 ? this.currentYear + 1 : this.currentYear;
        }

        if(this.options.url){
            const response = await fetch(`${this.options.url}?${this.options.parameters.month}=${this.currentMonth+1}&${this.options.parameters.year}=${this.currentYear}`);
        }

        this.renderCalendar();
    }

    attachListeners() {
        window.addEventListener("resize", this.changeSpacing);
    }

}