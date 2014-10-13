<?php

class AlertUser extends Eloquent {

    protected $table = 'alert_users';
    protected $fillable = array('email');

    public static function boot()
    {
      parent::boot();

      // Setup event bindings...
      AlertUser::created(function($alertuser)
      {

      });

    }

    public function alerts()
    {
      return $this->hasMany('AlertRegistration');
    }
}