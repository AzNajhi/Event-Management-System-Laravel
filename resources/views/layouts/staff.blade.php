<x-template :title="$title" :csspath="$csspath" :jspath="$jspath">
    <div class="app-form">
        <div class="card">
            <!-- STAFF LIST HERE -->
            <x-staffList :staffs="$staffs"></x-staffList>
        </div>
    </div>

    <div class="bottom-buttons mt-4 mb-4">
        <a href="{{ asset('') }}" class="btn btn-primary process-button">Back</a>
        <button class="btn btn-primary" name="add-staff" type="button" onclick="addStaff()">Add Staff</button>
    </div>
</x-template>