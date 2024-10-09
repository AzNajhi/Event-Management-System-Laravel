@props(['staffs' => []])

<table>
    @foreach ($staffs as $index => $row)
        <tr>
            <td>
                <input class='form-control staff-input' type='text' value='{{ $row->fullname }}' data-id='{{ $row->id }}' data-index='{{ $index + 1 }}' disabled='true'>
            </td>
            <td>
                <div class='button-group'>
                    <button class='btn btn-secondary edit-button' data-index='{{ $index + 1 }}' type='button' onclick='editStaff(this)'><i class='fa-solid fa-pen-to-square'></i></button>
                    <button class='btn btn-danger delete-button' data-index='{{ $index + 1 }}' type='button' onclick='deleteStaff(this)'><i class='fas fa-trash'></i></button>
                </div>
            </td>
        </tr>
    @endforeach
</table>