TwitterForZombies::Application.routes.draw do


match 'get_weapon_type' => 'weapons#getWpType'

# proxy weapons
match 'weapons/test' => "weapons#test"
post 'weapons/read' => "weapons#get_index"
post 'weapons/create' => "weapons#create"
post 'weapons/update' => "weapons#update"
post 'weapons/destroy' => "weapons#destroy"

post 'supports/read' => "supports#get_index"
post 'supports/create' => "supports#create"
post 'supports/update' => "supports#update"
post 'supports/destroy' => "supports#destroy"

match 'get_zombie_info' => "weapons#get_zombie_info"

# proxy support
match 'get_support' => "supports#get_support"


  resources :brains

  resources :zombies do
    resources :tweets
    get :decomp, :on => :member
  end

  match 'get_index' => 'weapons#get_index'


  post 'zombies/random_zombie' => 'zombies#random_zombie'
  post 'zombies/new'=> 'zombies#zombie_new', :as => 'zombie_new_po'
  post 'login/login' => 'login#login'
  root :to => 'login#index'
  get 'weapons' => 'weapons#index', :as => "weapons"
  
  get 'supports' => 'supports#index', :as => "supports"
  post 'weapons/buy' => 'weapons#buy', :as => 'buy_weapon'
  post 'weapons/unequip' => 'weapons#unequip', :as => 'unequip_weapon'



  post 'supports/wear' => 'supports#wear', :as => 'wear_support'
  post 'supports/unwear' => 'supports#unwear', :as => 'unwear_support'


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => "welcome#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
