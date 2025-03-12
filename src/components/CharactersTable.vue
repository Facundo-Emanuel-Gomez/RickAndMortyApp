<template>
    <q-card>
        <q-inner-loading :showing="loading">
            <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>

        <q-table :rows="filteredCharacters" :columns="columns" row-key="id" :pagination="pagination"
            @request="loadCharacters" :loading="loading" hide-bottom>
            <template v-slot:body-cell-image="props">
                <q-td :props="props">
                    <img :src="props.row.image" alt="Character Image" class="character-img" />
                </q-td>
            </template>
        </q-table>
        <q-pagination v-model="pagination.page" :max="maxPages" direction-links @update:model-value="loadCharacters"
            class="q-mt-md" />
    </q-card>
</template>

<style scoped>

h1 {
    font-size: clamp(1.8rem, 4vw, 3rem);
    text-align: center;
    font-weight: bold;
}


.q-table {
    font-family: 'Poppins', sans-serif;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: var(--table-bg, white);
    max-width: 90vw;
    margin: auto;
    transition: background 0.3s ease;
}


.q-table th {
    background-color: var(--header-bg, #f4f4f4);
    color: var(--header-text, #333);
    font-weight: bold;
}


.q-table td {
    padding: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}


.q-table th:nth-child(3),
.q-table td:nth-child(3) {
    width: auto;
    min-width: 70px;
    padding: 0;
    text-align: center;
}

.q-table tbody td:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
}


.character-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
}

.character-img:hover {
    transform: scale(1.1);
}


.q-table tbody tr:hover {
    background-color: var(--row-hover, #f5f5f5);
    transition: background 0.2s ease-in-out;
}

.q-table tbody tr:hover .character-img {
    background-color: transparent !important;
}


.q-pagination {
    margin-top: 15px;
    display: flex;
    justify-content: center;
}


body.body--dark {
    --table-bg: #1e1e1e;
    --header-bg: #333;
    --header-text: #f4f4f4;
    --row-hover: rgba(255, 255, 255, 0.1);
}

body.body--dark .q-table th:nth-child(3),
body.body--dark .q-table td:nth-child(3) {
    max-width: 90vw;
    padding: 0;
}


body.body--dark .q-table {
    border: 2px solid #444;

}


@media (max-width: 768px) {
    h1 {
        font-size: 2rem;
        text-align: center;
    }

    .q-table {
        font-size: 12px;
        display: block;
        overflow-x: auto;
    }

    .q-table thead {
        display: none;
    }


    .q-table tbody td {
        display: block;
        text-align: right;
        padding-left: 50%;
        position: relative;
    }

    .q-table tbody td:before {
        content: attr(data-label);
        position: absolute;
        left: 10px;
        font-weight: bold;
        text-align: left;
    }
}
</style>


<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { fetchCharacters } from '../services/api';

interface Character {
    id: number;
    name: string;
    image: string;
    species: string;
}


export default defineComponent({

    name: 'CharactersTable',
    props: {
        searchQuery: String
    },
    setup(props) {
        const characters = ref<Character[]>([]);
        const loading = ref(false);
        const pagination = ref({ page: 1, rowsPerPage: 20 });
        const columns = [
            { name: 'id', label: 'ID', field: 'id', align: 'left' as const },
            { name: 'name', label: 'Nombre', field: 'name', align: 'left' as const },
            { name: 'image', label: 'Imagen', field: 'image', align: 'center' as const },
            { name: 'species', label: 'Especie', field: 'species', align: 'left' as const }
        ];

        const maxPages = ref(1);

        const loadCharacters = async () => {
            loading.value = true;
            try {
                const data = await fetchCharacters(pagination.value.page, props.searchQuery || '');
                characters.value = data.results;
                maxPages.value = data.info.pages; // ✅ Actualizamos el total de páginas
            } catch (error) {
                console.error('Error fetching characters:', error);
            } finally {
                loading.value = false;
            }
        };

        onMounted(async () => {
            console.log('Component mounted, loading characters...');
            await loadCharacters();
        });

        watch(() => props.searchQuery, async () => {
            await loadCharacters();
        });

        const filteredCharacters = computed(() => {
            if (!props.searchQuery) return characters.value;
            return characters.value.filter(character =>
                character.name.toLowerCase().includes(props.searchQuery!.toLowerCase())
            );
        });

        return {
            characters,
            filteredCharacters,
            columns,
            pagination,
            loadCharacters,
            loading,
            maxPages
        };
    }
});
</script>