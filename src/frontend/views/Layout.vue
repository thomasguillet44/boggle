<template>
    <div class="layout">
        <header>
            <slot name="header"></slot>
        </header>  

        <nav class="timer">
            <slot name="timer"></slot> 
        </nav>

        <main class="main-content">
            <slot name="main"></slot>
        </main>
        

        <footer class="footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.main-content {
    flex: 1; /* prend tout l’espace entre header et footer */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.timer {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
}
</style>