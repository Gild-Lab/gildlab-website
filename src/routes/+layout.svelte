<script>
    import "../app.css";
    import {page} from '$app/stores';
    import {fade} from 'svelte/transition';
    import {navOpen} from "../store.js";
    import gildlab_logo from "../assets/gildlab_logo.svg"
    import Dropdown from "../components/Dropdown.svelte";

    let path;

    $: path = $page.url.pathname;

    $: path && closeNav()


    function openNav() {
        navOpen.set(true)
    }

    function closeNav() {
        navOpen.set(false)
    }

    export function toSentenceCase(text) {
        text = text.toLowerCase()
        let txtArr = text.split(/[,._\s]/)
        let firstWord = txtArr[0]
        let firstLetter = firstWord.charAt(0).toUpperCase()
        firstWord = firstLetter + firstWord.slice(1)
        txtArr = txtArr.slice(1)
        txtArr.unshift(firstWord)
        return txtArr.join(' ').replace("-", " ")
    }

    let isPdfOpen = false;
    let scrolled = false;

    $: path && (isPdfOpen = path !== "/")

    let y;

    $: y && (scrolled = y > 10)

    let whitePapers = [
        {path:"/whitepaper-1/", label:"Whitepaper 1"},
        {path:"/whitepaper-2/", label:"Whitepaper 2"},
        {path:"/whitepaper-3/", label:"Whitepaper 3"},
        {path:"/whitepaper-4/", label:"Whitepaper 4"},
    ]

</script>

<svelte:window bind:scrollY={y}/>
{#if ($navOpen)}
  <div class="overlay"></div>
{/if}
<div class={isPdfOpen || scrolled? "header pt-3 pb-3" : "header" }>
  <div class="logo">
    <a class="" href="/">
      <img src={gildlab_logo} alt="gildlab" loading="lazy"/>
    </a>
  </div>
  <div class={isPdfOpen || scrolled? "header-text header-text-hidden": "header-text" } id="header-text">
    <span class="fw-700">Welcome to Gild Lab</span>
    <span>We are a software provider for ESG assets.</span>
  </div>

  <div class="navigation breakpoint-1">
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link" href="/manual" class:active={path==='/manual/'}> Manual</a>
      </li>
      <li>
        <Dropdown items={whitePapers} triggerLabel="Whitepapers" {path}/>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/terms" class:active={path==='/terms/'}> Terms</a>
      </li>
    </ul>
  </div>

  <div class="navigation breakpoint-2">
    <ul class="nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.3335 9.9165L5.66683 9.9165" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M28.3335 17L5.66683 17" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M28.3335 24.0835L5.66683 24.0835" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </a>
        <div class="dropdown-menu">
          <a class="dropdown-item" class:active-dropdown-item={path==='/whitepaper-1/'} href="/whitepaper-1">Whitepaper
            1</a>
          <a class="dropdown-item" class:active-dropdown-item={path==='/whitepaper-2/'} href="/whitepaper-2">Whitepaper
            2</a>
          <a class="dropdown-item" class:active-dropdown-item={path==='/whitepaper-3/'} href="/whitepaper-3">Whitepaper
            3</a>
          <a class="dropdown-item" class:active-dropdown-item={path==='/whitepaper-4/'} href="/whitepaper-4">Whitepaper
            4</a>
          <a class="dropdown-item" href="/manual" class:active-dropdown-item={path==='/manual/'}> Manual</a>
          <a class="dropdown-item" href="/terms" class:active-dropdown-item={path==='/terms/'}> Terms</a>
        </div>
      </li>
    </ul>
  </div>


  {#if !$navOpen}
    <div class="location fw-700">{toSentenceCase(path.slice(1, -1))}</div>
  {/if}
  <div class="burger">
    {#if !$navOpen}
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"
           on:click={()=>{openNav()}}>
        <path d="M28.3335 9.9165L5.66683 9.9165" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M28.3335 17L5.66683 17" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M28.3335 24.0835L5.66683 24.0835" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    {/if}

    {#if $navOpen}

      <div class="nav-mobile" in:fade={{duration : 150}} out:fade={{duration : 150}}>
        <div class="logo-and-close">
          <div class="logo-mobile">
            <img src={gildlab_logo} alt="gildlab"/>
          </div>
          <div class="close-menu">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"
                 on:click={()=>{closeNav()}}>
              <path d="M11.3335 11.3335L22.6668 22.6668" stroke="black" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path d="M22.6665 11.3335L11.3332 22.6668" stroke="black" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <a class="nav-item fw-700" class:active={path==='/manual'} href="/manual">Manual</a>
        <a class="nav-item fw-700" class:active={path==='/whitepaper-1'} href="/whitepaper-1">Whitepaper 1</a>
        <a class="nav-item fw-700" class:active={path==='/whitepaper-2'} href="/whitepaper-2">Whitepaper 2</a>
        <a class="nav-item fw-700" class:active={path==='/whitepaper-3'} href="/whitepaper-3">Whitepaper 3</a>
        <a class="nav-item fw-700" class:active={path==='/whitepaper-4'} href="/whitepaper-4">Whitepaper 4</a>
        <a class="nav-item fw-700" class:active={path==='/terms'} href="/terms">Terms</a>
      </div>
    {/if}

  </div>

</div>
<div class={ scrolled || isPdfOpen ? "content content-short" : "content content-tall" }>
  <slot></slot>
</div>

<style lang="css" global>
    @import '../app.css';
    @import url("https://use.typekit.net/fmp1hyo.css");
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap');

    .overlay {
        display: none;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
        cursor: pointer;
    }

    .logo {
        width: 174px;
        height: 60px;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 60px;
        position: fixed;
        top: 0;
        width: 100%;
        background: #ffffff;
        z-index: 2;
        transition: 0.3s;
    }

    .content-tall {
        margin-top: 180px;
        transition: 0.5s;
    }

    .content-short {
        margin-top: 70px;
        transition: 0.5s;
    }

    .navigation a {
        padding-left: 15px;
        padding-right: 15px;
        text-decoration: none;
        line-height: 23px;
        color: #000000;
    }

    .header-text {
        display: flex;
        flex-direction: column;
        font-size: 20px;
        transition: opacity 0.3s linear;
        opacity: 1;
    }

    .header-text-hidden {
        opacity: 0;
        transition: opacity 0.3s linear;
    }

    .nav-item, .dropdown-item {
        font-size: 20px;
        color: #000000;
        line-height: 15px
    }

    .navigation .nav-link:hover {
        box-shadow: inset 0 -6px 0 #DCDCDC;
        background: none;
    }

    .navigation .dropdown-item:hover {
        background: #DCDCDC;
    }

    .navigation {
        font-size: 20px;
        font-weight: 700;
    }

    .navigation .active {
        box-shadow: inset 0 -6px 0 #E8AF55;
    }

    .navigation .active-dropdown-item {
        background: #E8AF55;
    }

    .burger {
        display: none;
    }

    .location {
        display: none;
    }

    .breakpoint-2 {
        display: none;
    }

    .dropdown-item:active {
        background: #DCDCDC;
    }

    .dropdown-item {
        font-weight: 700;
        padding: 5px 0;
    }

    .dropdown-menu {
        padding: 0;
        border: 2px solid #DCDCDC;
        border-radius: 0;
        margin-top: 3px;
    }

    .dropdown-toggle:after {
        content: none
    }

    .breakpoint-2 .dropdown-menu {
        right: -50px !important;
        left: unset;
    }


    @media only screen and (max-width: 1200px) {
        .breakpoint-2 {
            display: flex;
        }

        .breakpoint-1 {
            display: none;
        }
    }

    @media only screen and (max-width: 600px) {

        .burger {
            display: block;
        }

        .header-text {
            display: none;
        }

        .content-tall {
            margin-top: 70px;
        }

        .navigation {
            display: none;
        }


        .logo svg {
            width: 99px;
        }

        .logo-mobile svg {
            width: 99px;
        }

        .header {
            padding: 17px 33px !important;
        }

        .nav-mobile {
            width: calc(100vw - 80px);
            position: absolute;
            left: 0;
            background: #ffffff;
            height: 100vh;
            display: flex;
            flex-direction: column;
            top: 0;
            border-right: 13px solid #8C8790;
            z-index: 3;
        }

        .nav-mobile a {
            text-decoration: none;
            line-height: 23px;
            color: #000000;
        }

        .nav-mobile .nav-item {
            padding: 17px 20px 17px 33px;
        }


        .nav-mobile .active {
            background-color: #EEEEEE;
        }


        .logo-and-close {
            display: flex;
            padding: 17px 20px 17px 33px;
            justify-content: space-between;
        }

        .location {
            display: block;
            font-family: 'Courier', sans-serif;
            font-style: normal;
            font-size: 16px;
            line-height: 40px;
        }

        .overlay {
            display: block;
        }

    }
</style>
