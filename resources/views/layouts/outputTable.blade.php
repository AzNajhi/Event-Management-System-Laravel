<table>
    <thead>
        <tr>
            <th>Day</th>
            @for ($x = 0; $x < $session; $x++)
                <th>Session {{ $x + 1 }}</th>
            @endfor
        </tr>
    </thead>
    <tbody>
        @for ($y = 0; $y < $day; $y++)
            <tr><th>{{ $y + 1 }}</th>
                @for ($z = 0; $z < $session; $z++)
                    <td>@for ($a = 0; $a < ($staffTotal / ($session * $day)); $a++)
                            @if ($a == ($staffTotal / ($session * $day)) - 1)
                                {{ array_pop($staffInputs) }}
                            @else
                                {{ array_pop($staffInputs), }}
                            @endif
                        @endfor
                    </td>
                @endfor
            </tr>
        @endfor
    </tbody>
</table>