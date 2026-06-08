console.log("JS 연결됨");


// =====================================
// 영상 섹션 버튼


const previewVideo = document.querySelector(".preview-video");
const videoGoBtn = document.querySelector(".video-go-btn");
const videoArrow = document.querySelector(".video-arrow");
const videoTargetSection = document.querySelector(".experience-section");

if (previewVideo && videoGoBtn && videoArrow) {
    previewVideo.addEventListener("play", function() {
        videoGoBtn.classList.remove("show");
        videoArrow.classList.remove("show");
    });

    previewVideo.addEventListener("ended", function() {
        videoGoBtn.classList.add("show");
        videoArrow.classList.add("show");
    });

    videoGoBtn.addEventListener("click", function() {
    if (videoTargetSection) {
        const targetTop = videoTargetSection.offsetTop + 80;

        window.scrollTo({
            top: targetTop,
            behavior: "smooth"
             });
            }
        });
    }






// =====================================
// 오버뷰 섹션 클릭 이벤트

const keywords = document.querySelectorAll('.overview-keyword');

keywords.forEach(keyword => {
    keyword.addEventListener('click', function() {
        // 클릭할 때마다 active 클래스를 넣었다가 뺐다가 합니다.
        this.classList.toggle('active');
    });
});





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
    ".solution-section, .screenflow-section, .benefit-section, .service-feature, .cta-section"
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
    const totalScroll = end - start;

    if (scrollY < start || scrollY > end) return;
    if (totalScroll <= 0) return;

    const progress = (scrollY - start) / totalScroll;

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

const targetDiaryText = "공원에서 산책하고 산뜻하게 하루를 시작했어요.";

function normalizeText(text) {
    return text.replace(/\s/g, "");
}



// 이미지 프리로드 (로딩 덜 걸리게)
function preloadExperienceImages() {
    const imagePaths = [
        "./img/experience/1/01.png",
        "./img/experience/1/01_로고.png",
        "./img/experience/1/01_시작버튼.png",
        "./img/experience/1/01_말풍선.png",

        "./img/experience/2/02.png",
        "./img/experience/2/02_버튼.png",
        "./img/experience/2/02_말풍선.png",

        "./img/experience/3/03.png",
        "./img/experience/3/03_답변버튼(1).png",
        "./img/experience/3/03_답변버튼(2).png",
        "./img/experience/3/03_말풍선(1).png",
        "./img/experience/3/03_말풍선(2).png",
        "./img/experience/3/03_작성바.png",

        "./img/experience/4/04.png",
        "./img/experience/4/04_작성바.png",
        "./img/experience/4/04_키보드.png",
        "./img/experience/4/04_홈인디케이터.png",
        "./img/experience/4/04_말풍선.png",

        "./img/experience/5/05.png",
        "./img/experience/5/05_작성바.png",
        "./img/experience/5/05_버튼.png",
        "./img/experience/5/05_말풍선.png",

        "./img/experience/6/06.png",
        "./img/experience/6/06_답변버튼(1).png",
        "./img/experience/6/06_답변버튼(2).png",
        "./img/experience/6/06_말풍선.png",

        "./img/experience/7/07.png",
        "./img/experience/7/07_답변버튼(1).png",
        "./img/experience/7/07_답변버튼(2).png",
        "./img/experience/7/07_말풍선.png",

        "./img/experience/8/08.png",
        "./img/experience/8/08_말풍선(1).png",
        "./img/experience/8/08_말풍선(2).png",
        "./img/experience/8/08_말풍선(3).png",
        "./img/experience/8/08_작성란.png",
        "./img/experience/8/08_버튼.png",

        "./img/experience/9/09.png",
        "./img/experience/9/09_말풍선(1).png",
        "./img/experience/9/09_말풍선(2).png",
        "./img/experience/9/09_버튼.png",

        "./img/experience/11/11.png",
        "./img/experience/11/11_말풍선.png"
    ];

    imagePaths.forEach(function(src) {
        const img = new Image();
        img.src = src;
    });
}


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

// 키보드 전용 클리핑 박스 생성
function createKeyboardFrame(src) {
    if (!experienceLayerBox) return null;

    const frame = document.createElement("div");
    frame.className = "experience-keyboard-frame";

    const img = document.createElement("img");
    img.src = src;

    frame.appendChild(img);
    experienceLayerBox.appendChild(frame);

    return frame;
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

    const bubble = createExperienceLayer(
        "./img/experience/1/01_말풍선.png",
        "experience-start-bubble"
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

    if (bubble) {
        setTimeout(function() {
            bubble.classList.add("show");
        }, 2200);
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
    experienceScreen.style.visibility = "visible";

    experienceState = 2;
    updateExperienceStep(2);

    const homeButton = createExperienceLayer(
        "./img/experience/2/02_버튼.png",
        "experience-home-button"
    );

    const homeBubble = createExperienceLayer(
        "./img/experience/2/02_말풍선.png",
        "experience-home-bubble"
    );

    if (homeButton) {
    homeButton.classList.add("show");

    homeButton.addEventListener("click", function() {
        showExperiencePlace();
    });
}

    if (homeBubble) {
        setTimeout(function() {
            homeBubble.classList.add("show");
        }, 1800);
    }

    console.log("2번 홈 화면으로 이동");
}


// Experience 구조가 있을 때만 실행
if (experienceScreen && experienceLayerBox) {
    preloadExperienceImages();
    // showExperienceStart();
}


// 3번 화면
function showExperiencePlace() {
    if (!experienceScreen || !experienceLayerBox) return;

    clearExperienceLayers();

    if (experienceVideo) {
        experienceVideo.classList.remove("active");
        experienceVideo.pause();
    }

    experienceScreen.style.display = "block";
    experienceScreen.src = "./img/experience/3/03.png";
    experienceScreen.style.visibility = "visible";

    experienceState = 3;
    updateExperienceStep(3);
    experienceStepsBox.classList.remove("step-1", "step-2", "step-3", "step-4");
    experienceStepsBox.classList.add("step-1");

    const row1 = createExperienceMarquee(
        "./img/experience/3/03_답변버튼(1).png",
        "experience-place-marquee-1"
    );

    const row2 = createExperienceMarquee(
        "./img/experience/3/03_답변버튼(2).png",
        "experience-place-marquee-2"
    );

    const bubble1 = createExperienceLayer(
        "./img/experience/3/03_말풍선(1).png",
        "experience-place-bubble-1"
    );

    const bubble2 = createExperienceLayer(
        "./img/experience/3/03_말풍선(2).png",
        "experience-place-bubble-2"
    );

    const inputBar = createExperienceLayer(
        "./img/experience/3/03_작성바.png",
        "experience-place-input"
    );

    if (row1) row1.classList.add("show");
    if (row2) row2.classList.add("show");
    if (inputBar) inputBar.classList.add("show");

    if (bubble1) {
        setTimeout(function() {
            bubble1.classList.add("show");
        }, 1800);
    }

    if (bubble2) {
        setTimeout(function() {
            bubble2.classList.add("show");
        }, 3200);
    }

    if (inputBar) {
        inputBar.addEventListener("click", function() {
            showExperienceKeyboard();
        });
    }
}


// 3번 마키 애니메이션
function createExperienceMarquee(src, className) {
    if (!experienceLayerBox) return null;

    const windowBox = document.createElement("div");
    windowBox.className = `experience-marquee-window ${className}`;

    const track = document.createElement("div");
    track.className = "experience-marquee-track";

    const img1 = document.createElement("img");
    img1.src = src;

    const img2 = document.createElement("img");
    img2.src = src;

    track.appendChild(img1);
    track.appendChild(img2);
    windowBox.appendChild(track);

    experienceLayerBox.appendChild(windowBox);

    return windowBox;
}


// 4번 화면
function showExperienceKeyboard() {
    if (!experienceScreen || !experienceLayerBox) return;

    clearExperienceLayers();

    if (experienceVideo) {
        experienceVideo.classList.remove("active");
        experienceVideo.pause();
    }

    experienceScreen.style.display = "block";
    experienceScreen.src = "./img/experience/4/04.png";

    experienceState = 4;
    updateExperienceStep(4);

    // 4번도 장소 선택 단계라 1번 진행 상태만 유지
    if (experienceStepsBox) {
       experienceStepsBox.classList.remove("step-1", "step-2", "step-3", "step-4");
        experienceStepsBox.classList.add("step-1");
    }

    const inputBar = createExperienceLayer(
        "./img/experience/4/04_작성바.png",
        "experience-keyboard-input"
    );

    const keyboard = createExperienceLayer(
    "./img/experience/4/04_키보드.png",
    "experience-keyboard-img"
    );

    const homeIndicator = createExperienceLayer(
    "./img/experience/4/04_홈인디케이터.png",
    "experience-keyboard-home-indicator"
    );

    const bubble = createExperienceLayer(
        "./img/experience/4/04_말풍선.png",
        "experience-keyboard-bubble"
    );

    if (inputBar) inputBar.classList.add("show");
    if (keyboard) keyboard.classList.add("show");
    if (homeIndicator) homeIndicator.classList.add("show");

    if (bubble) {
        setTimeout(function() {
            bubble.classList.add("show");
        }, 1200);
    }

    if (keyboard) {
        keyboard.addEventListener("click", function() {
            showExperienceTypedPlace();
        });
    }
}


// 5번 공원 입력 완료 화면
function showExperienceTypedPlace() {
    if (!experienceScreen || !experienceLayerBox) return;

    clearExperienceLayers();

    if (experienceVideo) {
        experienceVideo.classList.remove("active");
        experienceVideo.pause();
    }

    experienceScreen.style.display = "block";
    experienceScreen.src = "./img/experience/5/05.png";

    experienceState = 5;
    updateExperienceStep(5);

    // 5번도 장소 선택 단계라 1번 진행 상태만 유지
    if (experienceStepsBox) {
       experienceStepsBox.classList.remove("step-1", "step-2", "step-3", "step-4");
        experienceStepsBox.classList.add("step-1");
    }

    const inputBar = createExperienceLayer(
        "./img/experience/5/05_작성바.png",
        "experience-typed-input"
    );

    // const keyboard = createExperienceLayer(
    //     "./img/experience/5/05_키보드.png",
    //     "experience-typed-keyboard"
    // );

    // const homeIndicator = createExperienceLayer(
    //     "./img/experience/5/05_홈인디케이터.png",
    //     "experience-typed-home-indicator"
    // );

    const enterButton = createExperienceLayer(
        "./img/experience/5/05_버튼.png",
        "experience-typed-enter-button"
    );

    const bubble = createExperienceLayer(
        "./img/experience/5/05_말풍선.png",
        "experience-typed-bubble"
    );

    if (inputBar) inputBar.classList.add("show");
    // if (keyboard) keyboard.classList.add("show");
    // if (homeIndicator) homeIndicator.classList.add("show");
    if (enterButton) enterButton.classList.add("show");

    if (bubble) {
        setTimeout(function() {
            bubble.classList.add("show");
        }, 1200);
    }

    if (enterButton) {
        enterButton.addEventListener("click", function() {
            showExperienceActivity();
        });
    }
}


// 6번 활동 선택 화면
function showExperienceActivity() {
    if (!experienceScreen || !experienceLayerBox) return;

    clearExperienceLayers();

    if (experienceVideo) {
        experienceVideo.classList.remove("active");
        experienceVideo.pause();
    }

    experienceScreen.style.display = "block";
    experienceScreen.src = "./img/experience/6/06.png";

    experienceState = 6;
    updateExperienceStep(6);

    // 6번에서는 1~2번 진행 상태만 보이게
    if (experienceStepsBox) {
       experienceStepsBox.classList.remove("step-1", "step-2", "step-3", "step-4");
        experienceStepsBox.classList.add("step-2");
    }

    const row1 = createExperienceMarquee(
        "./img/experience/6/06_답변버튼(1).png",
        "experience-activity-marquee-1 experience-choice-marquee"
    );

    const row2 = createExperienceMarquee(
        "./img/experience/6/06_답변버튼(2).png",
        "experience-activity-marquee-2 experience-choice-marquee"
    );

    const bubble = createExperienceLayer(
        "./img/experience/6/06_말풍선.png",
        "experience-activity-bubble"
    );

    if (row1) row1.classList.add("show");
    if (row2) row2.classList.add("show");

    if (bubble) {
        setTimeout(function() {
            bubble.classList.add("show");
        }, 1800);
    }

    if (row1) {
        row1.addEventListener("click", function() {
            showExperienceEmotion();
        });
    }

    if (row2) {
        row2.addEventListener("click", function() {
            showExperienceEmotion();
        });
    }
}


// 7번 감정 선택 화면
function showExperienceEmotion() {
    if (!experienceScreen || !experienceLayerBox) return;

    clearExperienceLayers();

    if (experienceVideo) {
        experienceVideo.classList.remove("active");
        experienceVideo.pause();
    }

    experienceScreen.style.display = "block";
    experienceScreen.src = "./img/experience/7/07.png";

    experienceState = 7;
    updateExperienceStep(7);

    if (experienceStepsBox) {
        experienceStepsBox.classList.remove("step-1", "step-2", "step-3", "step-4");
        experienceStepsBox.classList.add("step-3");
    }

    const row1 = createExperienceMarquee(
        "./img/experience/7/07_답변버튼(1).png",
        "experience-emotion-marquee-1 experience-choice-marquee"
    );

    const row2 = createExperienceMarquee(
        "./img/experience/7/07_답변버튼(2).png",
        "experience-emotion-marquee-2 experience-choice-marquee"
    );

    const bubble = createExperienceLayer(
        "./img/experience/7/07_말풍선.png",
        "experience-emotion-bubble"
    );

    if (row1) row1.classList.add("show");
    if (row2) row2.classList.add("show");

    if (bubble) {
        setTimeout(function() {
            bubble.classList.add("show");
        }, 1800);
    }

    if (row1) {
        row1.addEventListener("click", function() {
            showExperienceRecord();
        });
    }

    if (row2) {
        row2.addEventListener("click", function() {
            showExperienceRecord();
        });
    }
}


// 8번 한 줄 기록 화면
function showExperienceRecord() {
    if (!experienceScreen || !experienceLayerBox) return;

    clearExperienceLayers();

    if (experienceVideo) {
        experienceVideo.classList.remove("active");
        experienceVideo.pause();
    }

    experienceScreen.style.display = "block";
    experienceScreen.src = "./img/experience/8/08.png";

    experienceState = 8;
    updateExperienceStep(8);

    if (experienceStepsBox) {
        experienceStepsBox.classList.remove("step-1", "step-2", "step-3", "step-4");
        experienceStepsBox.classList.add("step-4");
    }

    const bubble1 = createExperienceLayer(
        "./img/experience/8/08_말풍선(1).png",
        "experience-record-bubble-1"
    );

    const bubble2 = createExperienceLayer(
        "./img/experience/8/08_말풍선(2).png",
        "experience-record-bubble-2"
    );

    const bubble3 = createExperienceLayer(
        "./img/experience/8/08_말풍선(3).png",
        "experience-record-bubble-3"
    );

    const inputBox = createExperienceLayer(
        "./img/experience/8/08_작성란.png",
        "experience-record-input"
    );

    const realTextarea = createExperienceTextarea();


    const makeButton = createExperienceLayer(
        "./img/experience/8/08_버튼.png",
        "experience-record-button"
    );

    if (inputBox) inputBox.classList.add("show");
    if (makeButton) makeButton.classList.add("show");

    if (makeButton) {
    makeButton.addEventListener("click", function() {
        showExperienceLoading();
    });
}

    if (realTextarea) {
    realTextarea.focus();

    realTextarea.addEventListener("input", function() {
        if (normalizeText(realTextarea.value) === normalizeText(targetDiaryText)) {
            showExperienceWrittenBubblesOnly(); }
        });
    }

    if (bubble1) {
        setTimeout(function() {
            bubble1.classList.add("show");
        }, 1200);
    }

    if (bubble2) {
        setTimeout(function() {
            bubble2.classList.add("show");
        }, 2800);
    }

    if (bubble3) {
        setTimeout(function() {
            bubble3.classList.add("show");
        }, 4600);
    }

    if (inputBox) {
        inputBox.addEventListener("click", function() {
            showExperienceWrittenRecord();
        });
    }
}

// 8~9번 연결
function showExperienceWrittenBubblesOnly() {
    if (!experienceLayerBox) return;

    const oldBubbles = experienceLayerBox.querySelectorAll(
        ".experience-record-bubble-1, .experience-record-bubble-2, .experience-record-bubble-3"
    );

    oldBubbles.forEach(function(bubble) {
        bubble.remove();
    });

    const bubble1 = createExperienceLayer(
        "./img/experience/9/09_말풍선(1).png",
        "experience-written-bubble-1"
    );

    const bubble2 = createExperienceLayer(
        "./img/experience/9/09_말풍선(2).png",
        "experience-written-bubble-2"
    );

    if (bubble1) {
        setTimeout(function() {
            bubble1.classList.add("show");
        }, 1000);
    }

    if (bubble2) {
        setTimeout(function() {
            bubble2.classList.add("show");
        }, 2400);
    }
}



// 8번 작성란 textarea
function createExperienceTextarea() {
    if (!experienceLayerBox) return null;

    const textarea = document.createElement("textarea");

    textarea.className = "experience-real-textarea";
    textarea.placeholder = "당신의 하루를 적어주세요.";

    experienceLayerBox.appendChild(textarea);

    return textarea;
}


// 9번 한 줄 입력 완료 화면
// function showExperienceWrittenRecord() {
//     if (!experienceScreen || !experienceLayerBox) return;

//     clearExperienceLayers();

//     if (experienceVideo) {
//         experienceVideo.classList.remove("active");
//         experienceVideo.pause();
//     }

//     experienceScreen.style.display = "block";
//     experienceScreen.src = "./img/experience/9/09.png";

//     experienceState = 9;
//     updateExperienceStep(9);

//     if (experienceStepsBox) {
//         experienceStepsBox.classList.remove("step-1", "step-2", "step-3", "step-4");
//         experienceStepsBox.classList.add("step-4");
//     }

//     const bubble1 = createExperienceLayer(
//         "./img/experience/9/09_말풍선(1).png",
//         "experience-written-bubble-1"
//     );

//     const bubble2 = createExperienceLayer(
//         "./img/experience/9/09_말풍선(2).png",
//         "experience-written-bubble-2"
//     );

//     const makeButton = createExperienceLayer(
//         "./img/experience/9/09_버튼.png",
//         "experience-written-button"
//     );

//     if (makeButton) makeButton.classList.add("show");

//     if (bubble1) {
//         setTimeout(function() {
//             bubble1.classList.add("show");
//         }, 1600);
//     }

//     if (bubble2) {
//         setTimeout(function() {
//             bubble2.classList.add("show");
//         }, 3000);
//     }

//     if (makeButton) {
//         makeButton.addEventListener("click", function() {
//             showExperienceLoading();
//         });
//     }
// }


// 10번 로딩 영상 화면
function showExperienceLoading() {
    if (!experienceVideo || !experienceScreen || !experienceLayerBox) return;

    clearExperienceLayers();

    if (experienceStepsBox) {
        experienceStepsBox.classList.remove("show");
        experienceStepsBox.classList.remove("step-1", "step-2", "step-3", "step-4");
    }

    experienceState = 10;

    experienceScreen.style.display = "block";
    experienceScreen.style.visibility = "hidden";

    experienceVideo.classList.remove("fade-out");
    experienceVideo.classList.add("active");

    experienceVideo.currentTime = 0;
    experienceVideo.play();

    experienceVideo.onended = function() {
        experienceVideo.classList.add("fade-out");

        setTimeout(function() {
            experienceVideo.classList.remove("active");
            experienceVideo.classList.remove("fade-out");
            showExperienceComplete();
        }, 800);
    };
}


// 11번 완성 화면
function showExperienceComplete() {
    if (!experienceScreen || !experienceLayerBox) return;

    clearExperienceLayers();

    experienceScreen.style.display = "block";
    experienceScreen.style.visibility = "visible";
    experienceScreen.src = "./img/experience/11/11.png";

    experienceScreen.classList.remove("fade-in");
    void experienceScreen.offsetWidth;
    experienceScreen.classList.add("fade-in");

    experienceState = 11;

    const bubble = createExperienceLayer(
        "./img/experience/11/11_말풍선.png",
        "experience-complete-bubble"
    );

    if (bubble) {
        setTimeout(function() {
            bubble.classList.add("show");
        }, 1200);
    }
}


const experienceSection = document.querySelector(".experience-section");

let experienceStarted = false;

const experienceObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && !experienceStarted) {
            experienceStarted = true;
            showExperienceStart();
        }
    });
}, {
    threshold: 0.45
});

if (experienceSection) {
    experienceObserver.observe(experienceSection);
}




// 스토리 섹션 라인 드로잉
// const storySection = document.querySelector(".story-section");

// const storyLineObserver = new IntersectionObserver(function(entries) {
//     entries.forEach(function(entry) {
//         if (entry.isIntersecting) {
//             storySection.classList.add("show-line");
//         }
//     });
// }, {
//     threshold: 0.25
// });

// if (storySection) {
//     storyLineObserver.observe(storySection);
// }


// 스토리 섹션 라인 드로잉 - 스크롤 연동
const storySection = document.querySelector(".story-section");
const storyLinePath = document.querySelector(".story-line-path");

if (storySection && storyLinePath) {
    const storyLineLength = storyLinePath.getTotalLength();

    storyLinePath.style.strokeDasharray = storyLineLength;
    storyLinePath.style.strokeDashoffset = storyLineLength;

    window.addEventListener("scroll", function() {
        const sectionTop = storySection.offsetTop;
        const sectionHeight = storySection.offsetHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        const start = sectionTop - windowHeight * 0.9;
        const end = sectionTop + sectionHeight - windowHeight * 0.53;

        let progress = (scrollY - start) / (end - start);

        if (progress < 0) {
            progress = 0;
        }

        if (progress > 1) {
            progress = 1;
        }

        storyLinePath.style.strokeDashoffset = storyLineLength * (1 - progress);
    });
}



// 베네핏 섹션 카드 이미지 전환

const benefitCards = document.querySelectorAll(".benefit-card");

benefitCards.forEach(function(card) {
    card.addEventListener("click", function() {
        const diaryImg = card.querySelector(".benefit-diary-img");
        const resultImg = card.querySelector(".benefit-result-img");

        if (!diaryImg || !resultImg) return;

        diaryImg.classList.toggle("active");
        resultImg.classList.toggle("active");
    });
});