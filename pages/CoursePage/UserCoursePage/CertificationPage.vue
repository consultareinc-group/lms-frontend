<template>
  <div>
    <div
      v-if="loading"
      class="column items-center justify-center"
      style="height: 100vh; text-align: center"
    >
      <q-spinner-dots color="primary" size="80px" />
      <p
        class="text-subtitle1 text-primary"
        style="margin-top: 10px; font-size: 1.5rem"
      >
        Generating certificate...
      </p>
    </div>

    <div v-else class="row items-center justify-between" style="height: 100vh">
      <div class="col-6 text-center q-gutter-lg">
        <div class="q-gutter-md">
          <div class="text-h4 text-cyan text-weight-bold">
            Certificate of Completion
          </div>
          <div class="text-h5 text-weight-medium">
            Congratulations, {{ userName }}!
          </div>
        </div>
        <div>
          <p
            class="text-subtitle1"
            style="text-align: center; margin: 0 auto; max-width: 400px"
          >
            You have demonstrated exceptional knowledge and mastery by
            completing the {{ quizName }} as part of the
            {{ courseName }} course.
          </p>
        </div>
        <div class="q-gutter-md">
          <q-btn
            @click="browseMoreCourses"
            label="Browse More Courses"
            no-caps
            rounded
            class="text-black q-px-xl"
          />
          <q-btn
            label="Take Another Quiz"
            @click="navigateToQuizzes"
            no-caps
            rounded
            class="bg-accent text-white q-px-xl"
          />
        </div>
      </div>

      <!-- Certificate Preview with Overlay Text -->
      <div
        class="col-6"
        style="
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(4, 42, 81, 1) 0%,
            rgba(74, 143, 212, 1) 100%
          );
        "
      >
        <div
          class="q-gutter-xl justify-center items-center column"
          style="height: 100%"
        >
          <div class="text-h5 text-white text-start">Preview:</div>
          <div
            style="
              position: relative;
              display: inline-block;
              text-align: center;
              width: 100%;
              max-width: 500px;
            "
          >
            <img
              :src="certificateTemplate"
              alt="certificate-image"
              style="width: 100%"
            />

            <!-- Full Name -->
            <div
              style="
                position: absolute;
                top: 32%;
                left: 50%;
                transform: translateX(-50%);
                font-size: 1em;
                font-weight: 600;
                color: #585d67;
              "
            >
              {{ userName }}
            </div>

            <!-- Body -->
            <div
              style="
                position: absolute;
                top: 49%;
                left: 45%;
                transform: translate(-45%, -36%);
                font-size: 0.7em;
                font-weight: 300;
                text-align: justify;
                width: 90%;
                font-family: serif;
                color: #585d67;
              "
            >
              {{ certificateBody }}
            </div>

            <!-- Date of Completion -->
            <div
              style="
                position: absolute;
                top: 67.5%;
                left: 66%;
                transform: translate(-45%, -23%);
                font-size: 0.6em;
                font-weight: 300;
                text-align: justify;
                width: 90%;
                font-family: serif;
                color: #585d67;
              "
            >
              {{ dateCompleted }}
            </div>

            <!-- Certificate No. -->
            <div
              style="
                position: absolute;
                top: 71.5%;
                left: 66%;
                transform: translate(-45%, -23%);
                font-size: 0.6em;
                font-weight: 300;
                text-align: justify;
                width: 90%;
                font-family: serif;
                color: #585d67;
              "
            >
              {{ certificateNo }}
            </div>

            <!-- Valid until -->
            <div
              style="
                position: absolute;
                top: 75.5%;
                left: 66%;
                transform: translate(-45%, -23%);
                font-size: 0.6em;
                font-weight: 300;
                text-align: justify;
                width: 90%;
                font-family: serif;
                color: #585d67;
              "
            >
              {{ validUntil }}
            </div>
          </div>

          <q-btn
            label="Download Certificate"
            no-caps
            rounded
            class="bg-accent text-white q-px-xl"
            @click="generateCertificate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import certificateTemplate from "../../../assets/certificate-template-new.png";
import { onMounted, ref } from "vue";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { LocalStorage, date } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";
import { useLogStore } from "../../../stores/log-store";

// Variables
const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();
const logStore = useLogStore();

const logId = +route.params.log_id;
const logDetails = ref({});

const loading = ref(false);

const padId = (id, length) => {
  return id.toString().padStart(length, "0");
};

const userDetails = authStore.UserInformation;
const quizDetails = LocalStorage.getItem("quiz");
const courseDetails = LocalStorage.getItem("course");

const userName = ref(
  `${userDetails?.first_name?.toUpperCase() || ""} ${
    userDetails?.middle_name ? userDetails.middle_name.toUpperCase() : ""
  } ${userDetails?.last_name?.toUpperCase() || ""} ${
    userDetails?.suffix ? userDetails.suffix.toUpperCase() : ""
  }`
);

const quizName = ref(quizDetails.quiz_name.toUpperCase());
const courseName = ref(courseDetails.course_name.toUpperCase());
const certificateBody = ref(
  `has successfully completed the FAMILIARIZATION TRAINING. This course covered essential topics related to participants, providing a comprehensive learning experience designed to equip them with the necessary skills and knowledge to navigate the complexities of ${courseName.value}.`
);
const dateCompleted = ref(null);
const certificateNo = ref(padId(route.params.log_id, 10));
const validUntil = ref(null);

// Lifecycle Hooks
onMounted(async () => {
  await getLog();
});

// Functions
const getLog = async () => {
  loading.value = true;

  logStore
    .GetLog({ id: logId })
    .then((response) => {
      logDetails.value = response.data;
      dateCompleted.value = logDetails.value.date_time_completed
        ? date.formatDate(logDetails.value.date_time_completed, "MMMM D, YYYY")
        : "N/A";
      validUntil.value = logDetails.value.date_time_completed
        ? date.formatDate(
            date.addToDate(logDetails.value.date_time_completed, { years: 1 }),
            "MMMM D, YYYY"
          )
        : "N/A";
    })
    .catch((error) => {
      console.error("Error fetching log details:", error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const navigateToQuizzes = () => {
  router.push({
    name: "List of Quizzes",
    params: {
      course_id: courseDetails.id,
    },
  });
};

const generateCertificate = async () => {
  try {
    const templateUrl = new URL(
      "../../../assets/certificate-template-new.pdf",
      import.meta.url
    ).href;
    const templateBytes = await fetch(templateUrl).then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontSize = 12;
    const color = rgb(88 / 255, 93 / 255, 103 / 255);

    const textWidth = fontRegular.widthOfTextAtSize(userName.value, 24);
    const pageWidth = page.getWidth();
    const xPosition = (pageWidth - textWidth) / 2;

    page.drawText(userName.value, {
      x: xPosition,
      y: 380,
      size: 24,
      font: fontRegular,
      color: color,
    });

    const maxWidth = 750; // Adjust as needed
    const lineHeight = 20;
    const words = certificateBody.value.split(" ");
    let line = "";
    let yPosition = 340;

    for (const word of words) {
      const testLine = line + word + " ";
      const testWidth = fontRegular.widthOfTextAtSize(testLine, 16);
      if (testWidth > maxWidth) {
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: 16,
          font: fontRegular,
          color: color,
        });
        line = word + " ";
        yPosition -= lineHeight;
      } else {
        line = testLine;
      }
    }

    // Draw the last line
    if (line) {
      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: 16,
        font: fontRegular,
        color: color,
      });
    }

    page.drawText(dateCompleted.value, {
      x: 210,
      y: 187,
      size: 14,
      font: fontRegular,
      color: color,
    });

    page.drawText(certificateNo.value, {
      x: 210,
      y: 162,
      size: 14,
      font: fontRegular,
      color: color,
    });

    page.drawText(validUntil.value, {
      x: 210,
      y: 137,
      size: 14,
      font: fontRegular,
      color: color,
    });

    // Testing Purposes
    // const pdfBytes = await pdfDoc.save();
    // const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    // const pdfUrl = URL.createObjectURL(pdfBlob);
    // window.open(pdfUrl, "_blank");

    const pdfBytes = await pdfDoc.save();
    saveAs(
      new Blob([pdfBytes], { type: "application/pdf" }),
      `${courseDetails.course_name.toUpperCase()} CERTIFICATE - ${
        userName.value
      }.pdf`
    );
  } catch (error) {
    console.error("Error generating certificate:", error);
  }
};

const browseMoreCourses = () => {
  router.push({ name: "Courses" });
};
</script>
