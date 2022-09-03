<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <InputLine
      :label="'Email'"
      v-if="store.session"
      :type="'text'"
      :is-disabled="true"
      :value="
        store.session.user && store.session.user.email
          ? store.session.user.email
          : 'email not loading'
      "
    />
    <InputLine :label="'Name'" :type="'text'" />
    <InputLine :label="'Website'" :type="'website'" />
    <div>
      <InputLine
        :label="'Website'"
        :type="'submit'"
        :is-disabled="loading"
        class="button block primary"
        :value="loading ? 'Loading ...' : 'Update'"
      />
    </div>
    <div>
      <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { supabase } from "@/lib/supabaseClient";
import { tryCatchError } from "@/modules/ErrorHandler/typeError";
import { userStore } from "@/store/user";
import { inputsStore } from "@/store/inputs";
import { onMounted, ref } from "vue";
import InputLine from "@/components/InputLine.vue";
import { storeToRefs } from "pinia";
const avatar_url = ref("");
const storeInputs = inputsStore();
const { username, website } = storeToRefs(storeInputs);
const store = userStore();
const { loading } = storeToRefs(store);

async function getProfile() {
  try {
    store.setLoading(true);
    const _user = supabase.auth.user();
    if (_user === null || store.session === null || store.session.user === null) {
      throw new Error("========== store.user === null ==========");
    }
    store.session.user = _user;
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url`)
      .eq("id", _user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
  } catch (e: unknown) {
    tryCatchError(e);
  } finally {
    store.setLoading(false);
  }
}

async function updateProfile() {
  try {
    store.setLoading(true);
    const _user = supabase.auth.user();
    if (_user === null || store.session === null || store.session.user === null) {
      throw new Error("========== store.user === null ==========");
    }
    store.session.user = _user;
    if (store.session.user === null) {
      throw new Error("========== store.user === null ==========");
    }
    const updates = {
      id: store.session.user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) throw error;
  } catch (e: unknown) {
    tryCatchError(e);
  } finally {
    store.setLoading(false);
  }
}

async function signOut() {
  try {
    store.setLoading(true);
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (e: unknown) {
    tryCatchError(e);
  } finally {
    store.setLoading(false);
  }
}

onMounted(() => {
  getProfile();
});
</script>
