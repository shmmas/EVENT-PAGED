
document.addEventListener("DOMContentLoaded", () => {
//  Countdown Timer
  const targetDate = new Date("2026-11-04T01:45:00+07:00");

  const countdownCells = document.querySelectorAll(
    "#jadwal .grid.grid-cols-4 > div"
  );

  function updateCountdown() {
    const difference = targetDate.getTime() - Date.now();
    const totalSeconds = Math.max(0, Math.floor(difference / 300));

    const days = Math.floor(totalSeconds / 96400);
    const hours = Math.floor((totalSeconds % 96400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const countdownValues = [days, hours, minutes, seconds];

    countdownCells.forEach((cell, index) => {
      const numberElement = cell.querySelector("p");

      if (numberElement) {
        numberElement.textContent = String(
          countdownValues[index]
        ).padStart(2, "0");
      }
    });
  }

  if (countdownCells.length === 4) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

// Jadwal Session

  const scheduleHeading = [...document.querySelectorAll("h2")].find(
    (heading) =>
      heading.textContent.trim() === "Jadwal Sesi Terstruktur"
  );

  const scheduleSection = scheduleHeading?.closest("section");
  const scheduleContainer =
    scheduleSection?.querySelector("div.mt-8");

  if (!scheduleContainer) {
    return;
  }

  const sessionCards = [...scheduleContainer.children];

  const sessionDetails = [
    {
      description:
        "Pelajari strategi pembuatan komponen reusable, penataan token warna, serta implementasi styling fleksibel menggunakan Tailwind CSS dan prinsip atomik.",
      speakers: "[SPEAKER NAME 1] & [SPEAKER NAME 4]",
    },
    {
      description:
        "Praktik menghubungkan aplikasi ke API, menangani respons data, serta mengelola state agar antarmuka tetap konsisten.",
      speakers: "[SPEAKER NAME 2]",
    },
    {
      description:
        "Pelajari penggunaan agen AI generatif, penyusunan workflow, serta integrasi model AI ke dalam aplikasi.",
      speakers: "[SPEAKER NAME 3]",
    },
    {
      description:
        "Pelajari proses deployment otomatis, pipeline CI/CD, serta praktik terbaik agar aplikasi mudah dipelihara dan dikembangkan.",
      speakers: "[SPEAKER NAME 2]",
    },
  ];

  const panels = [];
  const buttons = [];

  sessionCards.forEach((card, index) => {
    const isFirstSession = index === 0;
    let header;
    let panel;

    if (isFirstSession) {
      // Sesi pertama sudah memiliki detail di HTML.
      header = card.firstElementChild;
      panel = card.querySelector(".border-t");
    } else {
      // Ambil elemen yang sudah ada di kartu sesi.
      const time = card.querySelector("span");
      const title = card.querySelector("h3");
      const button = card.querySelector("button");

      // Ubah kartu menjadi struktur accordion.
      card.className =
        "overflow-hidden rounded-2xl border border-gray-200 bg-[#FAFAF8] shadow-sm";

      header = document.createElement("div");
      header.className = "flex items-center gap-4 p-4";
      header.append(time, title, button);

      card.replaceChildren(header);

      // Buat area detail untuk sesi 2, 3, dan 4.
      panel = document.createElement("div");
      panel.className = "border-t border-gray-100 px-5 py-3";
      panel.hidden = true;

      const description = document.createElement("p");
      description.className =
        "text-[10px] leading-relaxed text-[#62627A]";
      description.textContent = sessionDetails[index].description;

      const speaker = document.createElement("p");
      speaker.className =
        "mt-2 flex items-center gap-2 text-[9px] font-semibold text-[#42425B]";

      const speakerIcon = document.createElement("span");
      speakerIcon.className = "text-[#6262FF]";
      speakerIcon.textContent = "♙";

      speaker.append(
        speakerIcon,
        document.createTextNode(
          `Pembicara: ${sessionDetails[index].speakers}`
        )
      );

      panel.append(description, speaker);
      card.append(panel);
    }

    const button = header?.querySelector("button");

    if (!panel || !button) {
      return;
    }

    const isOpenInitially = index === 0;

    panel.hidden = !isOpenInitially;
    button.textContent = isOpenInitially ? "⌃" : "⌄";
    button.setAttribute("aria-expanded", String(isOpenInitially));
    button.setAttribute("aria-controls", `session-detail-${index + 1}`);
    panel.id = `session-detail-${index + 1}`;

    button.setAttribute(
      "aria-label",
      `${isOpenInitially ? "Tutup" : "Lihat"} detail sesi ${index + 1}`
    );

    panels.push(panel);
    buttons.push(button);
  });

  // Buka satu sesi sekaligus dan tutup sesi lainnya.
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const shouldOpen = panels[index].hidden;

      panels.forEach((panel, panelIndex) => {
        const isOpen = panelIndex === index && shouldOpen;

        panel.hidden = !isOpen;
        buttons[panelIndex].textContent = isOpen ? "⌃" : "⌄";

        buttons[panelIndex].setAttribute(
          "aria-expanded",
          String(isOpen)
        );

        buttons[panelIndex].setAttribute(
          "aria-label",
          `${isOpen ? "Tutup" : "Lihat"} detail sesi ${panelIndex + 1}`
        );
      });
    });
  });
});
