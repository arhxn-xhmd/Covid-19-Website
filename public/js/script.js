console.log('Lets write JavaScript.')

async function fetchData(url) {
    let rawData = await fetch(url);
    let data = await rawData.json();
    return data;
}

async function displayCovidCases() {

    let totalPopulation = 1000000;
    let confirmedCases = Math.floor(Math.random() * totalPopulation);
    let recovered = Math.floor(Math.random() * (confirmedCases + 1));
    let deaths = Math.floor(Math.random() * (confirmedCases - recovered + 1));
    let active = confirmedCases - (recovered + deaths);

    function render() {
        let string = `
            <h2>COVID-19 Tracker</h2>
            <h3>Total Confirmed Corona Cases</h3>
            <h1>${confirmedCases}</h1>

            <div class="detailed-info">
                <div class="keys">
                    <ul class="active"><li>Active Cases</li></ul>
                    <ul class="recovered"><li>Recovered Cases</li></ul>
                    <ul class="deaths"><li>Deaths</li></ul>
                </div>

                <div class="values">
                    <div>${active}</div>
                    <div>${recovered}</div>
                    <div>${deaths}</div>
                </div>
            </div>
            <button class="doctor-button">MEET THE DOCTOR</button>`;
        document.querySelector('.left').innerHTML = string;
    }

    render();

    setInterval(() => {
        const change = () => Math.floor(Math.random() * 5) + 1;
        const sign = () => (Math.random() < 0.5 ? -1 : 1);

        confirmedCases = Math.max(0, confirmedCases + change() * sign());
        recovered = Math.max(0, recovered + change() * sign());
        deaths = Math.max(0, deaths + change() * sign());

        if (recovered + deaths > confirmedCases) {
            recovered = Math.floor(confirmedCases * 0.8);
            deaths = Math.floor(confirmedCases * 0.2);
        }

        active = confirmedCases - (recovered + deaths);

        render();
    }, 1000);
}


async function contagionCovid(url, selector, className, info) {
    let array = await fetchData(url);
    let headings = array.headings;
    let texts = array.texts;
    let images = array.images;

    const inner = document.querySelector(selector);

    function createBox(heading, text, image) {
        const box = document.createElement('div');
        box.className = className;
        box.innerHTML = `
            <img width="100" src="${image}" alt="">
            <div class="${info}">
                <h3>${heading}</h3>
                <p>${text}</p>
            </div>
        `;
        return box;
    }

    for (let i = 0; i < Math.min(3, headings.length); i++) {
        inner.appendChild(createBox(headings[i], texts[i], images[i]));
    }

    let currentIndex = 3;

    function scrollEffect() {
        const boxHeight = inner.firstElementChild.offsetHeight + 20;

        inner.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        inner.style.opacity = '0';

        setTimeout(() => {
            inner.style.transition = 'none';
            inner.style.transform = 'translateY(0)';
            inner.style.opacity = '0';

            inner.removeChild(inner.firstElementChild);
            const nextBox = createBox(
                headings[currentIndex % headings.length],
                texts[currentIndex % texts.length],
                images[currentIndex % images.length]
            );
            inner.appendChild(nextBox);
            currentIndex++;

            void inner.offsetWidth;

            inner.style.transition = 'opacity 0.8s ease';
            inner.style.opacity = '1';
        }, 800);
    }

    let interval = setInterval(scrollEffect, 3500);

    inner.addEventListener('mouseenter', () => clearInterval(interval));
    inner.addEventListener('mouseleave', () => {
        interval = setInterval(scrollEffect, 3500);
    });
}

async function displaySymptoms() {
    let symptoms = await fetchData('/symptoms');
    let headings = symptoms.headings;
    let texts = symptoms.texts;
    let images = symptoms.images;

    for (let index = 0; index < headings.length; index++) {
        const heading = headings[index];
        const text = texts[index];
        const image = images[index];

        let symptomString = `<div class="symptom-box">
                <img width="100" src="${image}" alt="symptom Image">
                <div class="symptom-info">
                    <h2>${heading}</h2>
                    <p>${text}</p>
                </div>
            </div>`

        document.querySelector('.symptoms-boxes').innerHTML = document.querySelector('.symptoms-boxes').innerHTML + symptomString;
    };
};

async function bestDoctor() {
    let doctorsData = await fetchData('/best-doctors');

    for (let index = 0; index < doctorsData.objArr.length; index++) {
        const obj = doctorsData.objArr[index];

        let drCards = `<div class="doctor-box">
                <div class="dr-img">
                    <img src="${obj.image}" alt="Doctor image">
                </div>

                <div class="dr-description">
                    <h2>${obj.name}</h2>
                    <h4>${obj.occupation}</h4>

                    <div class="flexbox">
                        <div class="line"></div>
                    </div>

                    <article>${obj.description}</article>

                    <div class="phone-number">
                        <div class="phn-img">
                            <img width="20" src="img/phone.svg" alt="">
                        </div>

                        <div class="number">
                            ${obj.phone}
                        </div>
                    </div>

                    <div class="e-mail">
                        <div class="mail-img">
                            <img width="20" src="img/e-mail.svg" alt="">
                        </div>

                        <div class="mail">
                            ${obj.email}
                        </div>

                    </div>

                    <div class="flexbox">
                        <button class="book-appointment-${index + 1} btn-styling">Book Appointment</button>
                    </div>
                </div>

                <div class="appointment-card card-num-${index + 1}">
                    
                    <div class="dr-form">
                        <div>
                            <h2>${obj.name}</h2>
                            <h4>${obj.occupation}</h4>
                        </div>

                        <div class="cross-${index + 1}">
                            <img src="img/cross.svg" alt="">
                        </div>
                    </div>

                    <input type="text" id="name" placeholder="Full Name">
                    <input type="email" id="email" placeholder="e-mail">
                    <input type="number" id="number" placeholder="Phone Number">
                    <input type="text" id="date" placeholder="Preferred Date (DD-MM-YYYY)">

                    <div class="flexbox">
                        <button class="btn-styling submit-${index + 1}">Submit and Download</button>
                    </div>
                </div>
            </div>`

        document.querySelector('.doctors-boxes').innerHTML = document.querySelector('.doctors-boxes').innerHTML + drCards;
    };
};

async function getSteps(purpose) {
    let rawSteps = await fetch('/steps', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            purpose: purpose
        })
    });

    let stepsData = await rawSteps.json();
    let description = stepsData.description;
    let steps = stepsData.steps;
    let images = stepsData.images;
    let heading = '';

    if (purpose == 'hand wash') {
        heading = 'How to Wash Your Hands';
    } else if (purpose == 'go out') {
        heading = 'How to Prepare Yourself When you Go Out';
    } else if (purpose == 'come in') {
        heading = 'How to Prepare Yourself When you Come Back';
    } else {
        throw SyntaxError('Sorry! This is not valid...')
    }

    let basicIntro = `<h1>${heading}</h1>
            <p>${description}</p>`;


    document.querySelector('.basic-intro').insertAdjacentHTML('afterbegin', basicIntro);
    document.querySelector('.steps').innerHTML = '';

    for (let index = 0; index < steps.length; index++) {
        const step = steps[index];

        let stepString = `<div class="step">
                <div class="step-num flexbox">${index + 1}</div>
                <img src="${images[index]}" alt="Steps Image">
                <h2>${step}</h2>
            </div>`;

        document.querySelector('.steps').innerHTML = document.querySelector('.steps').innerHTML + stepString;
    };
};

async function displayBlogs() {
    let blogs = await fetchData('/blogs');

    let headings = blogs.headings;
    let dates = blogs.dates;
    let authors = blogs.authors;
    let descriptions = blogs.descriptions;
    let images = blogs.images;

    for (let index = 0; index < headings.length; index++) {

        const heading = headings[index];
        const date = dates[index];
        const author = authors[index];
        const description = descriptions[index];
        const image = images[index];

        let blogString = `<div class="blog">
                <img src="${image}" alt="Blog Image">
                <div class="blog-description">
                    <h3>${heading}...</h3>
                    
                    <div class="date">
                        <img width="20" src="img/calendar.svg" alt="calendar">
                        <span>${date}</span>
                    </div>

                    <div class="author">
                        <img width="20" src="img/person.svg" alt="Person">
                        <span>${author}</span>
                    </div>
                    
                    <p>${description}</p>
                </div>

                <div class="break-line"></div>
                <div class="read">
                    <h4>Read More</h4>
                </div>`

        document.querySelector('.blogs').innerHTML = document.querySelector('.blogs').innerHTML + blogString;
    };
};

async function main() {

    await displayCovidCases();
    await bestDoctor();
    await contagionCovid('/contagion-corona', '.container .inner', 'box', 'box-info');
    await displaySymptoms();
    await contagionCovid('/prevention', '.prevention-container .prevention-inner', 'prevention-box', 'prevention-box-info');
    await getSteps('hand wash');
    await displayBlogs();

    window.addEventListener('scroll', () => {
        let header = document.querySelector('header')
        if (window.scrollY > 10) {
            header.style.backgroundColor = "#012B4A";
            document.querySelector('.arrow').style.display = 'flex';
        } else {
            header.style.backgroundColor = "transparent";
            document.querySelector('.arrow').style.display = 'none';
        };
    });

    document.querySelector(".arrow").addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    document.querySelector('.sick-button').addEventListener('click', async () => {

        let sickdata = await fetchData('/are-you-sick');


        let sickPopup = `<p>${sickdata.question}</p>
        <div class="btns">
            <button class="yes-btn">Yes</button>
            <button class="no-btn">No</button>
        </div>`;

        document.querySelector('.sick-popup').innerHTML = sickPopup;
        document.querySelector('.sick-popup').style.left = 0;

        document.querySelector('.yes-btn').addEventListener('click', () => {
            document.querySelector('.sick-popup').innerHTML = sickdata.yesAnswer;
            setTimeout(() => {
                document.querySelector('.sick-popup').style.left = '-600px';
            }, 3000);
        });

        document.querySelector('.no-btn').addEventListener('click', () => {
            document.querySelector('.sick-popup').innerHTML = sickdata.noAnswer;
            setTimeout(() => {
                document.querySelector('.sick-popup').style.left = '-600px';
            }, 3000);
        });

    });

    document.addEventListener('click', async (e) => {
        if (e.target && e.target.classList.contains('doctor-button')) {
            let json = await fetchData('/meet-doctor');
            let div = `<img width="80" src="${json.image}" alt="Image of Doctor">
        <p>${json.text}</p>`;

            document.querySelector('.doctor-popup').innerHTML = div;
            document.querySelector('.doctor-popup').style.left = 0;

            setTimeout(() => {
                document.querySelector('.doctor-popup').style.left = '-600px';
            }, 3000);
        }
    });


    document.querySelector('.book-appointment-1').addEventListener('click', () => {
        document.querySelector('.card-num-1').style.display = 'block';
    });

    document.querySelector('.book-appointment-2').addEventListener('click', () => {
        document.querySelector('.card-num-2').style.display = 'block';
    });

    document.querySelector('.book-appointment-3').addEventListener('click', () => {
        document.querySelector('.card-num-3').style.display = 'block';
    });

    document.querySelector('.cross-1').addEventListener('click', () => {
        document.querySelector('.card-num-1').style.display = 'none';
    });

    document.querySelector('.cross-2').addEventListener('click', () => {
        document.querySelector('.card-num-2').style.display = 'none';
    });

    document.querySelector('.cross-3').addEventListener('click', () => {
        document.querySelector('.card-num-3').style.display = 'none';
    });

    document.querySelector('.submit-1').addEventListener('click', async () => {

        let appointmentSlip = await fetch('/best-doctors', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                number: document.getElementById('number').value,
                date: document.getElementById('date').value
            })
        });

        window.location.href = `/best-doctors/download/appointment%20confirmation.txt`;
    });

    document.querySelector('.submit-2').addEventListener('click', async () => {

        let appointmentSlip = await fetch('/best-doctors', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                number: document.getElementById('number').value,
                date: document.getElementById('date').value
            })
        });

        window.location.href = `/best-doctors/download/appointment%20confirmation.txt`;
    });

    document.querySelector('.submit-3').addEventListener('click', async () => {

        let appointmentSlip = await fetch('/best-doctors', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                number: document.getElementById('number').value,
                date: document.getElementById('date').value
            })
        });
        window.location.href = `/best-doctors/download/appointment%20confirmation.txt`;
    });

    document.getElementById('steps').addEventListener('change', async () => {
        document.querySelectorAll('.basic-intro>h1, .basic-intro>p').forEach(el => el.remove());
        await getSteps(document.getElementById('steps').value);

    });
};

main();

