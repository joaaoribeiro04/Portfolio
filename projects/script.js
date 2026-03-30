$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Jigar Sable";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";
        projects.forEach(project => {
                // decide primary and fallback image paths
                let imgPrimary, imgFallback;
                if (project.image && (project.image.includes('/') || project.image.includes('.'))) {
                        // user provided a path (e.g. assets/images/backend.jpg)
                        const provided = project.image.replace(/^\/+/, '');
                        const base = provided.substring(provided.lastIndexOf('/') + 1);
                        // try absolute root first, then relative to projects folder, then direct relative
                        imgPrimary = '/' + provided;
                        imgFallback = '../' + provided; // when opened from /projects/
                        imgTertiary = 'assets/images/' + base; // as last resort
                    } else {
                        imgPrimary = `/assets/images/projects/${project.image}.png`;
                        imgFallback = `/assets/images/${project.image}.png`;
                        imgTertiary = null;
                    }

                projectsHTML += `
                <div class="grid-item ${project.category}">
                <div class="box" style="width: 380px; margin: 1rem">
        <img draggable="false" src="${imgPrimary}" alt="project" onerror="(function(img){ if(img.dataset.attempt==='1'){ img.dataset.attempt='2'; img.src='${imgFallback}'; } else if(img.dataset.attempt==='2' && '${imgTertiary}'){ img.dataset.attempt='3'; img.src='${imgTertiary}'; } else { img.onerror=null; }})(this)" data-attempt="1" />
            <div class="content">
                <div class="tag">
                <h3>${project.name}</h3>        </div>
                <div class="desc">
                    <p>${project.desc}</p>
                                        <div class="btns">
                                                <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                                        </div>
                </div>
            </div>
        </div>
        </div>`
        });
    projectsContainer.innerHTML = projectsHTML;

    // vanilla tilt.js
    // VanillaTilt.init(document.querySelectorAll(".tilt"), {
    //     max: 20,
    // });
    // // vanilla tilt.js  

    // /* ===== SCROLL REVEAL ANIMATION ===== */
    // const srtop = ScrollReveal({
    //     origin: 'bottom',
    //     distance: '80px',
    //     duration: 1000,
    //     reset: true
    // });

    // /* SCROLL PROJECTS */
    // srtop.reveal('.work .box', { interval: 200 });

    // isotope filter products
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    // filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

getProjects().then(data => {
    showProjects(data);
})
// fetch projects end

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}