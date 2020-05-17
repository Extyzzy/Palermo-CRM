<template>
  <div class="code-container">
        <p class="text-entry-email">
          Введите код подтверждения , отправленный на E-mail:
        </p>
        <p class="text-entry-email">
           <b>{{email}}</b>
        </p>

    <Input
      id="code"
      v-model="code"
      placeholder="Код"
      autocomplete="off"
      type="text"
      width="100%"
      :errorMessage="errors.hasOwnProperty('code') && errors.code[0]"
    />

      <div class="buttons">

          <span @click='submitCode()'>
              <Button :disabled="code === ''" text="Подтвердить "/>
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
    name: 'CodeModal',
    components: {
      Input,
      Button
    },
    props: {
      email: {
        type: String,
        required: false,
      },
    },
    data () {
      return {
        code: '',
        errors: {}
      }
    },
    computed: {
      ...mapGetters({
        translations: 'app/translations',
      }),
    },
    methods: {
      async submitCode() {
        const credentials = JSON.parse(localStorage.getItem('Credentials'));

        await this.axios.post(`${process.env.VUE_APP_API_URL}me/change-email-code?code=${this.code}`, {},
          {headers: { Authorization: `Bearer ${credentials.access_token}` }})
          .then(data => {
            if (data.data.success) {
              this.errors = {};
              this.$emit('updateActiveScreen', 'success');

            } else {
              this.errors = data.data.errors;
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .code-container {

    div {
      margin-top: 10px;
    }
  }
  .buttons {
    display: flex;
  }
  .text-entry-email {
    font-size: 12px;
    color: $color--dark--blue;
    margin-bottom: 10px;
  }
</style>
