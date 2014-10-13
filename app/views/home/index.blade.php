@extends('layouts.frontend')

@section('content')

  <div class="home">

    @if (count($projects) === 0)
      <div class="container text-center">
        <br/>
        <p class="lead" id="no-projects">It seems there are no projects here yet.
          If you are the admin, please visit the <a href="dashboard">Dashboard</a>
          and a Data Source to get started.
        </p>
      </div>
    @else

      <div class="home-map">

        <div id="map" style="height:700px;">
        </div>

        <div class="map-controls pull-left">
          <div class="btn-group-vertical">
            <button id="map-ctrl-zoom-in" class="btn btn-sm btn-embossed btn-primary">+</button>
            <button id="map-ctrl-zoom-out" class="btn btn-sm btn-embossed btn-primary">-</button>
          </div>
          <br/><br/>
          <button class="map-ctrl-search btn btn-sm btn-embossed btn-primary">
            <small><span class="fui-search"></span></small></button>
        </div>
        <div class="map-controls pull-right">
          <button class="map-ctrl-alert btn btn-sm btn-embossed btn-primary"
            data-toggle="modal" data-target="#alertModal">
            #</button>
        </div>

        <div class="home-search text-center container-fluid">
          <div class="row">
            <div class="col-md-4 col-md-offset-4">
              <h1 class="text-default">#GreenAlert</h1>
              <p class="lead">Search for EIAs Near You</p>
              <div class="form-group">
                <input type="text" class="form-control input-hg" id="search-geo" placeholder="Enter a location">
                <span class="glyphicon glyphicon-globe form-control-feedback"></span>
              </div>
              <p class="text-primary" id="loading-geo" style="display:none;">
                <i class="fa fa-circle-o-notch fa-spin"></i>
                Finding Projects Near You...
              </p>
            </div>
          </div>
        </div>

      </div>


      <!-- MODALS -->

      <!-- Create Alert Modal -->
      <div class="modal" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="alertModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <button type="button" class="close close-modal" data-dismiss="modal">
                <span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
              </button>
              <h4 class="modal-title" id="alertModalLabel">Create Alert</h4>
            </div><!-- /.modal-header -->

            <div class="modal-body">

              <div id="map-alert" style="height:200px; cursor:default;"></div>
              <hr/>
              <p>Enter your e-mail address below to receive alerts in this area.</p>
              <div class="form-horizontal" role="form">
                <div class="form-group map-alert-email">
                  <label for="map-alert-email" class="col-sm-2 control-label">Email</label>
                  <div class="col-sm-8">
                    <input type="email" class="form-control" id="map-alert-email" placeholder="Email">
                  </div>
                </div>
                <div class="form-group hidden">
                  <label for="map-alert-bounds" class="col-sm-2 control-label">Area</label>
                  <div class="col-sm-8">
                    <input type="email" class="form-control" id="map-alert-bounds" placeholder="Email">
                  </div>
                </div>
              </div>

              <!-- Alerts -->
              <div class="alert alert-info text-center" role="alert" style="display:none;"><small>
                <i class="fa fa-circle-o-notch fa-spin"></i>
                Creating alert. You'll soon be receiving updates from this area.
              </small></div>
              <div class="alert alert-success alert-dismissible" role="alert" style="display:none;">
                <button type="button" class="close" data-dismiss="alert">
                  <span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <small><span class="fui-check-circle"></span> Successfuly added alert.</small>
              </div>
              <div class="alert alert-danger alert-dismissible" role="alert" style="display:none;">
                <button type="button" class="close" data-dismiss="alert">
                  <span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <small>
                  <span class="fui-alert-circle"></span>
                  <b>Oops!</b> Looks like something went wrong.
                  <span class="msg-error email" style="display:none;"><br/>Please check the e-mail.</span>
                  <span class="msg-error limit" style="display:none;"><br/>You've reached the max number of alerts registration.</span>
                </small>
              </div>

            </div><!-- /.modal-body -->

            <div class="modal-footer">
              <button type="button" class="close-modal btn btn-embossed btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="create-alert-btn btn btn-embossed btn-primary"># Create Alert</button>
            </div><!-- /.modal-footer -->

          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->


    @endif

  </div> <!-- /.data-sources-list -->

@stop