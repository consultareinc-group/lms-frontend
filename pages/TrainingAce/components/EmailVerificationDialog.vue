<template>
  <q-dialog persistent>
    <q-card class="login-card">
      <q-icon
        name="cancel"
        color="grey"
        size="sm"
        class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
        @click="closeDialog"
      />

      <q-card-section class="text-center">
        <div class="text-h5">{{ message }}</div>
      </q-card-section>

      <q-card-section>
        <q-btn
          @click="sendOtp"
          v-if="mode === 'otp'"
          label="Send One Time Passcode"
          color="primary"
          type="submit"
          class="full-width text-capitalize"
          :loading="loading"
        />

        <q-form v-if="mode === 'verify'" @submit.prevent="verifyOtp">
          <q-input
            v-model="otp"
            type="number"
            outlined
            class="q-mb-xl"
            style="height: 30px"
            :rules="[(val) => !!val || 'This field is required']"
          />
          <q-btn
            label="Verify OTP"
            color="primary"
            type="submit"
            class="full-width text-capitalize"
            :loading="loading"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useQuasar } from "quasar";

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close", "verified"]);

// Variables
const $q = useQuasar();
const authStore = useAuthStore();
const mode = ref("otp");
const message = ref("Verify Your Email");

const otp = ref(null);
const loading = ref(false);

// Lifecycle hooks
onMounted(() => {
  mode.value = "otp";
  message.value = "Verify Your Email";
});

const closeDialog = () => {
  mode.value = "otp";
  message.value = "Verify Your Email";
  otp.value = null;

  emit("close");
};

const sendOtp = () => {
  loading.value = true;

  const payload = {
    email: props.email,
  };

  authStore
    .SendEmailOtp(payload)
    .then((response) => {
      // OTP sent successfully
      mode.value = "verify";
      message.value = "Enter the OTP sent to your email";

      $q.notify({
        message: `<p class='q-mb-none'>OTP sent to ${props.email}.</p>`,
        color: "green-2",
        position: "top",
        textColor: "green",
        html: true,
      });
    })
    .catch((error) => {
      // Handle error
      $q.notify({
        message: error.message,
        color: "red-2",
        position: "top",
        textColor: "red",
        html: true,
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

const verifyOtp = () => {
  loading.value = true;

  const payload = {
    email: props.email,
    otp: otp.value,
  };
  authStore
    .VerifyEmailOtp(payload)
    .then((response) => {
      // OTP verified successfully
      mode.value = "otp";
      message.value = "Verify Your Email";
      otp.value = null;

      $q.notify({
        message: `<p class='q-mb-none'>Email verified successfully.</p>`,
        color: "green-2",
        position: "top",
        textColor: "green",
        html: true,
      });

      emit("verified");
      emit("close");
    })
    .catch((error) => {
      // Handle error
      $q.notify({
        message: "Invalid OTP. Please try again.",
        color: "red-2",
        position: "top",
        textColor: "red",
        html: true,
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 300px;
  padding: 20px;
}
</style>
