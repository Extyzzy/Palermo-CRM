<template>
  <div class="email-entry">
    <p class="text-entry-email">Введите новый E-mail</p>
    <Input
      id="email"
      v-model="email"
      placeholder="Ведите новый E-mail"
      autocomplete="off"
      type="email"
      width="100%"
      :errorMessage="errors.hasOwnProperty('email') && errors.email[0]"
    />

    <div class="buttons">
      <span  @click='submitEmail()'>
        <Button :disabled="email === ''"  text="Подтвердить "/>
      </span>

      <span @click="$parent.$emit('close')">
          <Button cancel text="Отмена "/>
        </span>
    </div>

  </div>
</template>

<script>
  import Input from '@/components/Form/Input'
  import Button from '@/components/Form/Button'
  import { mapGetters } from 'vuex'

  export default {
    name: 'EmailModal',
    components: {
      Input,
      Button
    },
    data () {
      return {
        email: '',
        errors: {}
      }
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    methods: {
      async submitEmail() {
        const credentials = JSON.parse(localStorage.getItem('Credentials'));
        await this.axios.post(`${process.env.VUE_APP_API_URL}me/change-email?email=${this.email}`, {},
          {headers: { Authorization: `Bearer ${credentials.access_token}` }})
          .then(data => {
            if (data.data.success) {
              this.errors = {};
              this.$emit('updateActiveScreen', 'code', `${this.email}`);
            } else {
              this.errors = data.data.errors;
            }

          })
      }
    }
  }
</script>

<style lang="scss">
    .email-entry {

      input {
        margin-top: 10px;
      }
      .buttons {
        display: flex;
        margin-top: 40px;
      }
      .text-entry-email {
        font-size: 12px;
        color: $color--dark--blue;
        margin-bottom: 10px;
      }
    }
</style>
