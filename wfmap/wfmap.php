<?php
/*
Plugin Name: 3D Wayfinder
Plugin URI: https://www.3dwayfinder.com/wordpress
Version: 1.1.2
Author: 3D Wayfinder
Author URI: https://www.3dwayfinder.com/
Description: 3D Wayfinder embedding to a Wordpress page
Text Domain: wfmap
License: GPLv2
*/

class WFWordpress {

	// Call globals
	

	/**
	 * A reference to an instance of this class.
	 */
	private static $instance;

	/**
	 * The array of templates that this plugin tracks.
	 */
	protected $templates;

	/**
	 * Returns an instance of this class.
	 */
	public static function get_instance() {

		if ( null == self::$instance ) {
			self::$instance = new WFWordpress();
		}

		return self::$instance;

	}

	/**
	 * Initializes the plugin by setting filters and administration functions.
	 */
	private function __construct() {
		add_shortcode( 'wfmap', array( $this, 'shortcode' ) );
	}


	private function mergeAtts($pairs, $atts) {
		$atts = (array) $atts;
		$out  = array();

		foreach ( $pairs as $name => $default ) {
			$out[ $name ] = $default;
		}

		$_name = "";
		foreach ( $atts as $name => $default ) {
			$_name = $name;
			if (str_contains($name, "-") !== false) {
				$_name = str_replace('-', '', ucwords($name, '-'));
				$_name = lcfirst($_name);
			}
			$out[ $_name ] = $atts[ $name ];
		}

		return $out;
	}

	/**
	 * Adds shortcode that includes the map
	 */
	public function shortcode( $atts ) {
		$defaults = array( "project" => "demo", "group" => "NA", "maptype" => "2d", "wf_settings" =>  json_encode((object)[]));
		$options = $this->mergeAtts($defaults, $atts);
		if( !class_exists( 'WP_Filesystem_Direct' ) ) {
			require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-base.php';
			require_once ABSPATH . 'wp-admin/includes/class-wp-filesystem-direct.php';
		}
		$wpfsd = new WP_FileSystem_Direct( false );
		//print_r($atts);
		//$wpfsd = new WP_Filesystem_Direct( false );
		// include template with the arguments (The $args parameter was added in v5.5.0)
		$part = $wpfsd->get_contents(plugin_dir_path(__FILE__).'/app/index.html');
		$part = str_replace("%dir%", plugin_dir_url(__FILE__)."/app", $part);
		$settings = "{}";
		
		if(array_key_exists("wf_settings", $options)) {
			$settings = $options["wf_settings"];
			unset($options["wf_settings"]);
		}
		
		$part = str_replace("%WF_OPTIONS%", json_encode($options), $part);
		$part = str_replace("%WF_SETTINGS%", $settings, $part);
		//$part = str_replace("%GROUP%", $a["group"], $part);
		//$part = str_replace("%TYPE%", $a["type"], $part);
		return $part;
	}

	public static function enqueFiles() {
		//wp_enqueue_script('wf-ideapark.jscrollpane', plugin_dir_url(__FILE__) . 'jquery.jscrollpane.min.js');
		//wp_enqueue_style('wf-ideapark.css', plugins_url('jquery.jscrollpane.css', __FILE__ ));

		//wp_enqueue_script('wf-ideapark.jscrollpane', plugin_dir_url(__FILE__) . 'jquery.jscrollpane.min.js');
	}

}
add_action( 'plugins_loaded', array( 'WFWordpress', 'get_instance' ) );
add_action( 'wp_enqueue_scripts',array( 'WFWordpress', 'enqueFiles' ) );


