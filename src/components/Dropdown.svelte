<script>
    export let triggerLabel = "";
    export let triggerIcon;
    export let items;
    export let path;

    let dropdown;
    let dropdownHidden = true;

    function handleNavItemClick() {
        dropdownHidden = true
    }

    function toggleDropdown() {
        dropdownHidden = !dropdownHidden
    }

    function handleClickOutside() {
        dropdownHidden = true
    }

    function clickOutside(node) {

        const handleClick = event => {
            if (node && !node.contains(event.target) && !event.defaultPrevented) {
                node.dispatchEvent(
                    new CustomEvent('click_outside', node)
                )
            }
        }

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        }
    }

</script>
<div class="dropdown-container" on:click_outside={handleClickOutside} use:clickOutside>
  <div data-dropdown-toggle="dropdown" on:click={()=>toggleDropdown()}
       class="dropdown bg-white" type="button">
    {#if triggerIcon}
      <img src={triggerIcon} alt="icon"/>
    {/if}
    <span>{triggerLabel}</span>
  </div>
  <!-- Dropdown menu -->
  <div id="dropdown" class="absolute top-10 drop-menu" class:hidden={dropdownHidden} bind:this={dropdown}>
    <ul class="dropdown-items" aria-labelledby="dropdownDefaultButton">
      {#each items as item, i}
        <li class="list-item cursor-pointer" class:active={path===item.path} on:click={()=>handleNavItemClick()}>
          <a href={item.path}>{item.label}</a>
        </li>
        {#if item.break && i !== items.length - 1}
          <hr/>
        {/if}
      {/each}
    </ul>
  </div>
</div>

<style>

    .dropdown-container, .dropdown {
        height: 100%;
    }

    .dropdown:hover {
        box-shadow: inset 0 -6px 0 #DCDCDC;
        background: none;
    }

    .dropdown {
        border: none;
        display: flex;
        align-items: center;
        position: relative;
    }

    .dropdown:focus {
        outline: none;
    }

    .dropdown-items {
        position: absolute;
        background: #ffffff;
        list-style-type: none;
        padding: 0;
        width: max-content;
        top: 6.3rem;
        border-bottom: 2px solid #DCDCDC;
        border-left: 2px solid #DCDCDC;
        border-right: 2px solid #DCDCDC;
    }

    .list-item {
        padding: 0 15px 0 13px;
        display: flex;
        align-items: center;
    }

    .list-item.active {
        background-color: #E8AF55;
    }

    .list-item:hover {
        background-color: #DCDCDC;
    }

    hr {
        width: 90%;
        color: #D2D2D2;
        margin-left: 5%;
    }

    @media only screen and (max-width: 1200px) {
        .dropdown:hover {
            box-shadow: none;
        }

        .dropdown-items {
            right: 15px;
            top: 10rem;
            border-top: 2px solid #DCDCDC;
        }
    }


</style>
