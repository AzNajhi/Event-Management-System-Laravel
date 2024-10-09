<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Staff;

class EventController extends Controller
{
    public function requestStaffInputs (Request $request)
    {
        $totalStaff = (int)$request->input('totalStaff');
        $staffNames = Staff::orderBy('fullname', 'asc')->pluck('fullname');
        $responseData = [
            'message' => '<span>Kindly assign staff to the event.</span>',
            'view' => view('layouts/staffInputs', compact('staffNames', 'totalStaff'))->render(),
            'nameList' => $staffNames,
        ];
        return response()->json($responseData);
    }

    public function generateTable (Request $request)
    {
        $day = $request->input('day');
        $session = $request->input('session');
        $staffInputs = $request->input('staffInputs');
        $staffTotal = count($staffInputs);
        shuffle($staffInputs);

        return view('layouts/outputTable', compact('day', 'session', 'staffInputs', 'staffTotal'));
    }
}