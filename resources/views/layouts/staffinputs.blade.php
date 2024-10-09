<!-- View for Staff Inputs -->
@for ($x = 0; $x < $totalStaff; $x++)
    <select class="form-control selectpicker staff-id" data-index="{{ $x + 1 }}" onchange="checkStaffInputs(this, event)">
        <option value="">Select Staff {{ $x + 1 }}</option>
        @foreach ($staffNames as $index => $name)
            <option value="{{ $name }}">{{ $name }}</option>
        @endforeach
    </select>
@endfor