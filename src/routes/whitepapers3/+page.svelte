<script>
    import whitePaper from "../../assets/documents/whitepaper3.pdf"
</script>

<div class="pdf-container">
  <iframe src={`${whitePaper}#view=fit`} height="100%" width="100%"></iframe>
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