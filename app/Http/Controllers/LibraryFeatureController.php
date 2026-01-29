<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LibraryFeatureController extends Controller
{
    public function solarSystem() {
        return Inertia::render('library/features/solar-system-page');
    }
}
