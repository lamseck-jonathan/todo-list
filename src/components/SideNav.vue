<template>
    <div class="sidenav p-4 d-flex flex-column justify-between">
        <div class="card-body pb-4">
            <div class="d-flex align-items-center">
                <img
                    src="../assets/lamseck.png"
                    class="me-2"
                    height="50"
                    alt="MDB Logo"
                    loading="lazy"
                />
                <h5 class="text-secondary text-center pt-2">TickTask</h5>
            </div>
            <h5 class="card-title pt-4">
                Menu
            </h5>
            <div class="pb-4 bottom-separator-sidenav">
                <ul class="list-group list-group-light pt-2 ">
                    <li class="cursor-pointer list-group-item list-group-item-info px-3 border-0 rounded-3 mb-2 d-flex justify-content-between" aria-current="true">
                        <div>
                            <i class="fa-regular fa-calendar-check pr-2"></i>
                            Tache du jour
                        </div>
                    </li>
                    <!--
                    <button type="button" class="btn btn-link text-dark text-left" data-mdb-ripple-color="dark">
                        <i class="fa-solid fa-plus fa-lg"></i>
                        <span class="pt-1 pl-2">Ajouter une liste</span>
                    </button>
                    -->
                </ul>
            </div>

        </div>
        <a target="_blank" href="https://lamseck-jonathan.netlify.app/">
                &copy;Company Lam Seck
        </a>
    </div>
</template>

<script setup lang="ts">

</script>

<style>
    .sidenav{
        height: 100vh;
        width: 100%;
        background-color: white;
    }

    .bottom-separator-sidenav{
        border-bottom: 2px solid #54B4D3;
    }
    .cursor-pointer {
        cursor: pointer;
    }
</style>