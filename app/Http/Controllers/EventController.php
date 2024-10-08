<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;

class EventController extends Controller
{
    public function requestStaffName (Request $request)
    {
        $staffNames = Staff::orderBy('fullname', 'asc')->pluck('fullname');

        return response()->json([
            'nameList' => $staffNames,
        ]);
    }

    public function generateTable (Request $request)
    {
        $day = $request->input('day');
        $session = $request->input('session');
        $participant = $request->input('participant');
        $ratioStaff = $request->input('ratioStaff');
        $ratioParticipant = $request->input('ratioParticipant');
        $staffInputs = $request->input('staffInputs');
        $staffTotal = count($staffInputs);
        shuffle($staffInputs);

        $headerOutput = "";
        for ($x = 0; $x < $session; $x++) {
            $headerOutput .= "<th>Session " . ($x + 1) . "</th>";
        }

        $bodyOutput = "";
        for ($y = 0; $y < $day; $y++) {
            $bodyOutput .= "<tr><th>" . ($y + 1) . "</th>";
            for ($z = 0; $z < $session; $z++) {
                $bodyOutput .= "<td>";
                for ($a = 0; $a < ($staffTotal / ($session * $day)); $a++) {
                    if ($a == ($staffTotal / ($session * $day)) - 1) {
                        $bodyOutput .= array_pop($staffInputs);
                    } else {
                        $bodyOutput .= array_pop($staffInputs) . ", ";
                    }
                }
                $bodyOutput .= "</td>";
            }
            $bodyOutput .= "</tr>";
        }

        $scheduleTemplate = "
        <table>
            <thead>
                <tr>
                    <th>Day</th>
                    {$headerOutput}
                </tr>
            </thead>
            <tbody>
                {$bodyOutput}
            </tbody>
        </table>
        ";

        return response()->json([
            'table' => $scheduleTemplate,
        ]);
    }
}