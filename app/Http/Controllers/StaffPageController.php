<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;

class StaffPageController extends Controller
{
    public function unlockPage (Request $request)
    {
        $key = $request->input('key');

        if ($key === 'access-granted') {
            $staffs = Staff::orderBy('fullname', 'asc')->get();

            return view('layouts/staff', [
                'title' => 'Staff Management',
                'csspath' => 'css/staff.css',
                'staffs' => $staffs
            ]);
        }
    }

    public function addStaff (Request $request)
    {
        $name = $request->input('name');
        $newStaff = new Staff();
        $newStaff->fullname = $name;
        $newStaff->save();

        $staffs = Staff::orderBy('fullname', 'asc')->get();

        return view('layouts/staff', [
            'title' => 'Staff Management',
            'csspath' => 'css/staff.css',
            'staffs' => $staffs
        ]);
    }

    public function editStaff (Request $request)
    {
        $name = $request->input('name');
        $id = $request->input('id');
        $staff = Staff::find($id);
        $staff->fullname = $name;
        $staff->save();

        $staffs = Staff::orderBy('fullname', 'asc')->get();

        return view('layouts/staff', [
            'title' => 'Staff Management',
            'csspath' => 'css/staff.css',
            'staffs' => $staffs
        ]);
    }

    public function deleteStaff (Request $request) 
    {
        $id = $request->input('id');
        $staff = Staff::find($id);
        $staff->delete();

        $staffs = Staff::orderBy('fullname', 'asc')->get();

        return view('layouts/staff', [
            'title' => 'Staff Management',
            'csspath' => 'css/staff.css',
            'staffs' => $staffs
        ]);
    }
}