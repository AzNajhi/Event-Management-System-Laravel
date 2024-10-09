<x-template :title="$title" :csspath="$csspath" :jspath="$jspath">
    <div class="app-form">
        <div class="card">
            <div class="form-group">
                <table>
                    <tr>
                        <td><label class="form-label">Event Duration (Days)</label></td>
                        <td>:</td>
                        <td><input class="form-control" name="day" type="number" min="1" value="1" oninput="updateStaffInputs()"></td>
                    </tr>
                    <tr>
                        <td><label class="form-label">Sessions per Day</label></td>
                        <td>:</td>
                        <td><input class="form-control" name="session" type="number" min="1" value="1" oninput="updateStaffInputs()"></td>
                    </tr>
                    <tr>
                        <td><label class="form-label">Participants per Session</label></td>
                        <td>:</td>
                        <td><input class="form-control" name="participant" type="number" min="1" value="10" oninput="updateStaffInputs()"></td>
                    </tr>
                    <tr>
                        <td><label class="form-label">Staff-to-Participant Ratio</label></td>
                        <td>:</td>
                        <td>
                            <div class="form-group-ratio">
                                <input class="form-control" name="ratio-staff" type="number" min="1" value="1" oninput="updateStaffInputs()">:
                                <input class="form-control" name="ratio-participant" type="number" min="1" value="10" oninput="updateStaffInputs()">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="card">
            <div class="form-group-staff-input">
                <label class="staff-input-label"><span class="warning-message">Please ensure all inputs are filled out correctly.</span></label>
                <div class="staff-input">
                    <!-- STAFF INPUTS HERE -->
                </div>
            </div>
        </div>
    </div>

    <div class="bottom-buttons mt-4 mb-4">
        <button class="btn btn-primary process-button" type="button" disabled="true">Process Table</button>
        <a href="{{ asset('/staff-management') }}" class="btn btn-primary" type="button">Manage Staff</a>
    </div>

    <div class="result mb-4">
        <div class="card">
            <div class="result-group">
                <label class="result-label">Event Schedule Result:</label>
                <div class="result-schedule">
                    <!-- RESULT HERE -->
                </div>
            </div>
        </div>
    </div>
</x-template>