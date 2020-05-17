<template>
  <div class="email-entry">
    <p class="text-entry-password">Новый пароль</p>
    <Input
      id="password"
      v-model="password"
      placeholder="Ведите новый пароль"
      autocomplete="off"
      type="password"
      width="100%"
      :errorMessage="errors.hasOwnProperty('password') && errors.password[0]"
    />
    <p style="margin-top: 20px" class="text-entry-password">Подтвердите пароль</p>
    <Input
      id="confirmPassword"
      v-model="confirmPassword"
      placeholder="Ведите пароль еще раз"
      autocomplete="off"
      type="password"
      width="100%"
      :errorMessage="errors.hasOwnProperty('password_confirmation') && errors.password_confirmation[0]"
    />

    <div class="buttons">
      <span  @click='submitChangePassword()'>
        <Button text="Подтвердить "/>
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
    name: 'PasswordModal',
    components: {
      Input,
      Button
    },
    props: {

    },
    data () {
      return {
        password: '',
        confirmPassword: '',
        errors: {}
      }
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    methods: {
      async submitChangePassword() {
        const credentials = JSON.parse(localStorage.getItem('Credentials'));

        await this.axios.post(`${process.env.VUE_APP_API_URL}me/change-password?password=${this.password}&password_confirmation=${this.confirmPassword}`, {},
          {headers: { Authorization: `Bearer ${credentials.access_token}` }})
          .then(data => {
            if (data.data.success) {
              this.errors = {};
              this.$emit('updateActiveScreen', 'success')
            } else {
              this.errors = data.data.errors;
            }
          }).catch(e => alert(e))
      }
    }
  }
</script>

<style lang="scss" scoped>
    .email-entry {

      .buttons {
        display: flex;
        margin-top: 30px;
      }
      .text-entry-password {
        font-size: 12px;
        color: $color--dark--blue;
        margin-bottom: 10px;
      }
    }
</style>
