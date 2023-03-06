<script>
    import terms from "../../assets/documents/terms.pdf"
</script>

<div class="pdf-container">
  <iframe src={`${terms}#view=fit`} height="100%" width="100%"></iframe>
</div>
<style>
    .pdf-container {
        width: calc(100vw - 5px);
        height: calc(100vh - 200px);
    }

    @media only screen and (max-width: 600px) {
        .pdf-container {
            width: calc(100vw - 5px);
            height: calc(100vh - 20px);
        }
    }
</style>