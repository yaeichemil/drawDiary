console.log("JS 연결됨");


// =====================================
// 스크롤 등장 애니메이션

const observerOptions = {
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, observerOptions);

const animatedSections = document.querySelectorAll(
    ".solution-section, .screenflow-section, .service-feature, .cta-section"
);

animatedSections.forEach(function(section) {
    sectionObserver.observe(section);
});


// =====================================
// diary-create 섹션 스크롤 전환

const diarySection = document.querySelector(".diary-create-section");
const diaryCopies = document.querySelectorAll(".diary-create-copy");
const diaryPhones = document.querySelectorAll(".diary-phone-img");
const diaryDots = document.querySelectorAll(".diary-create-dots button");

function changeDiaryStep(stepIndex) {
    if (!diaryCopies.length || !diaryPhones.length || !diaryDots.length) return;

    diaryCopies.forEach(function(copy) {
        copy.classList.remove("active");
    });

    diaryPhones.forEach(function(phone) {
        phone.classList.remove("active");
    });

    diaryDots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    diaryCopies[stepIndex].classList.add("active");
    diaryPhones[stepIndex].classList.add("active");
    diaryDots[stepIndex].classList.add("active");
}

window.addEventListener("scroll", function() {
    if (!diarySection) return;

    const sectionTop = diarySection.offsetTop;
    const sectionHeight = diarySection.offsetHeight;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const start = sectionTop;
    const end = sectionTop + sectionHeight - windowHeight;

    if (scrollY < start || scrollY > end) return;

    const progress = (scrollY - start) / (end - start);

    let stepIndex = 0;

    if (progress < 0.33) {
        stepIndex = 0;
    } else if (progress < 0.66) {
        stepIndex = 1;
    } else {
        stepIndex = 2;
    }

    changeDiaryStep(stepIndex);
});


// =====================================
// Experience 체험 영역
// 지금은 임시 영상 처리 때문에 요소가 없거나 숨겨져도 에러 안 나게 작성

const experienceScreen = document.querySelector(".experience-screen");
const experienceLayerBox = document.querySelector(".experience-layer-box");
const experienceVideo = document.querySelector(".experience-video");
const experienceClickArea = document.querySelector(".experience-click-area");
const experienceStepsBox = document.querySelector(".experience-steps");
const experienceSteps = document.querySelectorAll(".experience-step");

let experienceState = 1;


// 레이어 비우기
function clearExperienceLayers() {
    if (!experienceLayerBox) return;
    experienceLayerBox.innerHTML = "";
}


// 레이어 이미지 생성
function createExperienceLayer(src, className) {
    if (!experienceLayerBox) return null;

    const img = document.createElement("img");

    img.src = src;
    img.className = `experience-start-layer ${className}`;

    experienceLayerBox.appendChild(img);

    return img;
}


// 진행 단계 표시 업데이트
function updateExperienceStep(screenNumber) {
    if (!experienceStepsBox || !experienceSteps.length) return;

    experienceSteps.forEach(function(step) {
        step.classList.remove("active");
    });

    // 1~2번 화면에서는 왼쪽 진행바 숨김
    if (screenNumber < 3) {
        experienceStepsBox.classList.remove("show");
        return;
    }

    experienceStepsBox.classList.add("show");

    if (screenNumber >= 3 && screenNumber <= 5) {
        experienceSteps[0].classList.add("active");
    } else if (screenNumber === 6) {
        experienceSteps[1].classList.add("active");
    } else if (screenNumber === 7) {
        experienceSteps[2].classList.add("active");
    } else if (screenNumber >= 8) {
        experienceSteps[3].classList.add("active");
    }
}


// 1번 시작 화면
function showExperienceStart() {
    if (!experienceScreen || !experienceLayerBox) return;

    clearExperienceLayers();

    if (experienceVideo) {
        experienceVideo.classList.remove("active");
        experienceVideo.pause();
    }

    experienceScreen.style.display = "block";
    experienceScreen.src = "./img/experience/1/01.png";

    experienceState = 1;
    updateExperienceStep(1);

    const logo = createExperienceLayer(
        "./img/experience/1/01_로고.png",
        "experience-start-logo"
    );

    const startButton = createExperienceLayer(
        "./img/experience/1/01_시작버튼.png",
        "experience-start-button"
    );

    if (logo) {
        setTimeout(function() {
            logo.classList.add("show");
        }, 300);
    }

    if (startButton) {
        setTimeout(function() {
            startButton.classList.add("show");
        }, 1100);

        startButton.addEventListener("click", function() {
            showExperienceHome();
        });
    }
}


// 2번 홈 화면
function showExperienceHome() {
    if (!experienceScreen || !experienceLayerBox) return;

    clearExperienceLayers();

    if (experienceVideo) {
        experienceVideo.classList.remove("active");
        experienceVideo.pause();
    }

    experienceScreen.style.display = "block";
    experienceScreen.src = "./img/experience/2/02.png";

    experienceState = 2;
    updateExperienceStep(2);

    console.log("2번 홈 화면으로 이동");
}


// Experience 구조가 있을 때만 실행
if (experienceScreen && experienceLayerBox) {
    showExperienceStart();
}