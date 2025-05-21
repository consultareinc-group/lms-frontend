<template>
  <q-dialog persistent>
    <q-card class="login-card">
      <q-icon
        name="cancel"
        color="grey"
        size="sm"
        class="absolute-top-right q-mt-sm q-mr-sm cursor-pointer"
        @click="$emit('close')"
      />

      <q-card-section class="text-center">
        <div>
          <q-img
            src="../../../../../assets/training-ace-pro-logo.png"
            width="250px"
          />
        </div>
        <div class="text-grey-6 text-h5">Register an account</div>
      </q-card-section>

      <q-card-section>
        <q-form
          @submit.prevent="emailVerificationDialog = true"
          class="q-gutter-y-md"
          greedy
        >
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-input
                dense
                v-model="form.firstname"
                label="First Name"
                :rules="[(val) => !!val || 'First Name is required']"
                lazy-rules
                outlined
              />
            </div>
            <div class="col-6">
              <q-input
                dense
                v-model="form.lastname"
                label="Last Name"
                :rules="[(val) => !!val || 'Last Name is required']"
                lazy-rules
                outlined
              />
            </div>
          </div>

          <q-input
            dense
            v-model="form.username"
            label="Username"
            :rules="[(val) => !!val || 'Username is required']"
            lazy-rules
            outlined
          />

          <q-input
            dense
            v-model="form.email"
            type="email"
            label="Email"
            :rules="[
              (val) => !!val || 'Email is required',
              (val) => /.+@.+\..+/.test(val) || 'Please enter a valid email',
            ]"
            lazy-rules
            outlined
          />

          <q-input
            dense
            v-model="form.password"
            :type="isPwd ? 'password' : 'text'"
            label="Password"
            :rules="[(val) => !!val || 'Password is required']"
            outlined
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-input
            dense
            v-model="form.confirmPassword"
            :type="isPwd ? 'password' : 'text'"
            label="Confirm Password"
            :rules="[
              (val) => !!val || 'Confirm Password is required',
              (val) => val === form.password || 'Passwords must match',
            ]"
            outlined
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="form.date_of_birth"
            dense
            class="q-mt-sm"
            placeholder="Date of Birth"
            :rules="[(val) => !!val || 'Date of Birth is required']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    minimal
                    v-model="form.date_of_birth"
                    @update:model-value="() => $refs.qDateProxy.hide()"
                    mask="YYYY-MM-DD"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-btn
            label="Register"
            type="submit"
            color="primary"
            class="full-width"
            no-caps
            dense
            :loading="btnLoadingState"
          />
          <div class="flex justify-center">
            <p>
              Already have an account?
              <span
                @click="emit('login')"
                class="cursor-pointer text-primary underline"
              >
                Login
              </span>
            </p>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <EmailVerificationDialog
      :email="form.email"
      v-model="emailVerificationDialog"
      @close="emailVerificationDialog = false"
      @verified="handleVerified"
    />
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";
import { useQuasar } from "quasar";

import EmailVerificationDialog from "./EmailVerificationDialog.vue";

const emit = defineEmits(["close", "login"]);

const router = useRouter();
const authStore = useAuthStore();
const $q = useQuasar();

const emailVerificationDialog = ref(false);

const form = ref({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  date_of_birth: "",
});

const isPwd = ref(true);
const btnLoadingState = ref(false);

const handleVerified = () => {
  btnLoadingState.value = true;

  const payload = {
    first_name: form.value.firstname,
    last_name: form.value.lastname,
    username: form.value.username,
    password: form.value.password,
    email: form.value.email,
    birthday: form.value.date_of_birth,
  };

  authStore
    .RegisterUser(payload)
    .then(() => {
      $q.notify({
        message: `<p class='q-mb-none'>Registration Successful, You have successfully logged in.</p>`,
        color: "green-2",
        position: "top",
        textColor: "green",
        html: true,
      });

      // clear form
      form.value.firstname = "";
      form.value.lastname = "";
      form.value.username = "";
      form.value.email = "";
      form.value.password = "";
      form.value.confirmPassword = "";
      form.value.date_of_birth = "";

      emit("close");
    })
    .catch((error) => {
      $q.notify({
        message: error.message,
        color: "red-2",
        position: "top",
        textColor: "red",
        html: true,
      });
    })
    .finally(() => {
      btnLoadingState.value = false;
    });
};
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 500px;
  padding: 20px;
}
</style>
