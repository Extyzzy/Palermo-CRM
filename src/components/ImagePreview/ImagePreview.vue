<template>
  <div class="form__meta-row-thumbnail-preview-component">
    <label
      class="form__label form__label--top"
      for="thumbnail"
      v-if="aboveText"
    >
      {{aboveText}} <span style="color: #F02C5A">*</span>
    </label>
    <input
      @change="setThumbnail($event)"
      accept=".jpg, .jpeg, .png"
      class="image-thumbnail-input"
      id="thumbnail"
      name="image_uploads"
      ref="thumbnailInput"
      type="file"
    />
    <button
      @click.prevent="$refs.thumbnailInput.click()"
      class="thumbnail-preview"
      ref="imagePreviewButton"
    >
        <img
          v-if="!!imagePreviewSrc"
          :alt="alt"
          class="thumbnail-preview__img"
          ref="imagePreview"
          :src="imagePreviewSrc"
        />
        <span class="add-image">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
            <g id="Baton" transform="translate(-668.078 -1198)">
              <g id="add-plus-button" transform="translate(668.078 1198)">
                <g id="add">
                  <path id="Path_8" data-name="Path 8" d="M14,8H8v6H6V8H0V6H6V0H8V6h6Z" fill="#8e9bad"/>
                </g>
              </g>
            </g>
          </svg>
        </span>
        <div v-bind:style="{  display: imagePreviewSrc ? 'block' : 'none' }"
             class="overlay-block" />
        <span v-bind:style="{  display: imagePreviewSrc ? 'block' : 'none' }"
              style="" @click="imagePreviewSrc = null"
              ref="deleteSvg"
              class="delete-image"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path id="Path_1262" data-name="Path 1262" d="M9,0a9,9,0,1,0,9,9A9.026,9.026,0,0,0,9,0Zm4.5,12.24L12.24,13.5,9,10.26,5.76,13.5,4.5,12.24,7.74,9,4.5,5.76,5.76,4.5,9,7.74,12.24,4.5,13.5,5.76,10.26,9Z" fill="#f02c5a"/>
            </svg>
        </span>
     </button>
  </div>
</template>

<script>
export default {
  props: {
    defaultImage: {
      required: false,
      type: String,
    },
    alt: {
      required: false,
      default: '',
      type: String,
    },
    aboveText: {
      required: false,
      default: '',
      type: String,
    },
    changedImage: {
      required: true,
      type: Function,
    }
  },
  data() {
    return {
      thumbnailFile: null,
      imagePreviewSrc: `https://backend-dev.palermo.md` + this.defaultImage
    }
  },
  methods: {
    setThumbnail(event) {
      this.thumbnailFile = event.target.files[0];
      this.imagePreviewSrc = URL.createObjectURL(this.thumbnailFile);
      this.changedImage(imagePreviewSrc);
    }
  }
};
</script>

<style
  lang="scss"
  scoped
>
  .form__meta-row-thumbnail-preview-component {
    display: flex;
    flex-direction: column;
    position: relative;

    .image-thumbnail-input {
      opacity: 0;
      position: absolute;
      pointer-events: none;
      -webkit-appearance: none;
    }
    .thumbnail-preview {
      background-color: #F5F6FA;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      height: 220px;
      width: 220px;
      position: relative;
    }

    &:hover .overlay-block {
      opacity: 0.3 !important;
    }

    &:hover .delete-image {
      opacity: 1 !important;
      display: block;
    }

    .thumbnail-preview__img {
      border-radius: 5px;
      object-fit: contain;
      pointer-events: none;
      height: 220px;
      width: 220px;
      z-index: 1;
    }

    .overlay-block {
      position: absolute;
      top: 0;
      z-index: 4;
      height: 220px;
      width: 220px;
      background-color: #3B4B68;
      border-radius: 5px;
      object-fit: contain;
      pointer-events: none;
      opacity: 0;
    }

    .delete-image {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 5;
      cursor: pointer;
      opacity: 0;
    }

    .add-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }

    .img__none {
      border-radius: 5px;
      object-fit: contain;
      pointer-events: none;
      height: 220px;
      width: 220px;
    }

    .image-thumbnail-input {
      opacity: 0;
      position: absolute;
      pointer-events: none;
      -webkit-appearance: none;
    }
  }
</style>
