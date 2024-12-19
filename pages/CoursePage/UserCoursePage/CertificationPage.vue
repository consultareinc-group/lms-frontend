<template>
  <div class="row items-center justify-between" style="height: 100vh">
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
          You have demonstrated exceptional knowledge and mastery by completing
          the quiz {{ quizName }} as part of the {{ courseName }} course.
        </p>
      </div>
      <div class="q-gutter-md">
        <q-btn
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
          <div
            style="
              position: absolute;
              top: 27%;
              left: 36%;
              transform: translate(-50%, -50%);
              font-size: 1.5em;
              font-weight: 600;
            "
          >
            {{ certificateName }}
          </div>
          <div
            style="
              position: absolute;
              top: 39%;
              left: 12%;
              transform: translate(-50%, -50%);
              font-size: 1em;
              font-weight: 600;
            "
          >
            {{ userName }}
          </div>
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
            "
          >
            has successfully completed the {{ quizName }}. This course covered
            essential topics related: {{ courseDescription }}. Participants
            engaged in a comprehensive learning experience designed to equip
            them with the necessary skills and knowledge to navigate the
            complexities of {{ courseName }}.
          </div>
          <!-- <div
            style="
              position: absolute;
              top: 60%;
              left: 48%;
              transform: translate(-50%, -50%);
              font-size: 1em;
              font-weight: 600;
            "
          >
            {{ courseName }}
          </div> -->
          <!-- <div
            style="
              position: absolute;
              bottom: 10%;
              left: 50%;
              transform: translate(-50%, 0);
              font-size: 1.1em;
              font-style: italic;
            "
          >
            Signature
          </div> -->
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
</template>

<script setup>
import certificateTemplate from "../../../assets/certificate-template.png";
import { ref } from "vue";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { LocalStorage } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();

const userDetails = LocalStorage.getItem("userDetails");
const quizDetails = LocalStorage.getItem("quiz");
const courseDetails = LocalStorage.getItem("course");

// const capitalize = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
// };
const certificate_name = "Familiarization Certificate";
const certificateName = ref(certificate_name.toUpperCase());
const userName = ref(
  `${userDetails.first_name.toUpperCase()} ${userDetails.last_name.toUpperCase()}`
);
const courseDescription = ref(
  "The practice of protecting systems, networks, and programs from digital attacks."
);
const quizName = ref(quizDetails.quiz_name.toUpperCase());
const courseName = ref(courseDetails.course_name.toUpperCase());

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
      "../../../assets/certificate-template.pdf",
      import.meta.url
    ).href;
    const templateBytes = await fetch(templateUrl).then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    page.drawText(userName.value, {
      x: 210,
      y: 120,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(quizName.value, {
      x: 115,
      y: 50,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(courseName.value, {
      x: 190,
      y: 120,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    saveAs(
      new Blob([pdfBytes], { type: "application/pdf" }),
      "certificate.pdf"
    );
  } catch (error) {
    console.error("Error generating certificate:", error);
  }
};
</script>
