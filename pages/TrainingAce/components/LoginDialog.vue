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
        <div class="logo-container q-mb-lg">
          <q-img
            src="../../../../../assets/training-ace-pro-logo.png"
            width="250px"
          />
        </div>
        <div class="text-grey-6 text-subtitle1">Sign in to your account</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-y-md" greedy>
          <q-input
            dense
            v-model="form.username"
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

          <!-- <div class="row items-center justify-between">
            <q-checkbox
              color="secondary"
              v-model="rememberMe"
              label="Remember me"
            />
            <q-btn flat color="primary" no-caps label="Forgot Password?" />
          </div> -->

          <q-btn
            label="Sign In"
            type="submit"
            color="primary"
            class="full-width"
            no-caps
            dense
            :loading="btnLoadingState"
          />
          <div class="flex justify-center">
            <p>Don't have an account? <a href="#">Register</a></p>
          </div>
        </q-form>
      </q-card-section>

      <!-- <q-card-section class="text-center q-pa-sm">
          <p class="text-grey-6">
            Don't have an account?
            <router-link to="/register" class="text-primary">Sign up</router-link>
          </p>
        </q-card-section> -->
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";
import { useQuasar } from "quasar";

const emit = defineEmits(["close"]);

const router = useRouter();
const authStore = useAuthStore();
const $q = useQuasar();

const form = ref({
  username: "",
  password: "",
});

const isPwd = ref(true);
const rememberMe = ref(false);
const btnLoadingState = ref(false);

const onSubmit = () => {
  btnLoadingState.value = true;
  authStore
    .LoginUser(form.value)
    .then((response) => {
      let status = Boolean(response.status === "success"); // Determine the status of the response
      if (status) {
        if (response.data.role === 0) {
          router.push({ name: "Course Management" });
        }

        if (response.data.role === 1) {
          router.push({ name: "Select Category" });
        }

        $q.notify({
          message: `<p class='q-mb-none'>You have successfully logged in.</p>`,
          color: "green-2",
          position: "top",
          textColor: "green",
          html: true,
        });

        // Close the dialog
        emit("close");
      }
    })
    .catch((error) => {
      $q.notify({
        message: `<p class='q-mb-none'><b>Login Failed!</b> Invalid Username or Password, Please try again.</p>`,
        color: "red-2",
        position: "top",
        textColor: "red",
        html: true,
      });
    })
    .finally(() => {
      btnLoadingState.value = false;
      form.value.username = "";
      form.value.password = "";
    });
};
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>
