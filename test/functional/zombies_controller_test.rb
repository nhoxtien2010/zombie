require 'test_helper'

class ZombiesControllerTest < ActionController::TestCase
  setup do
    @zomby = zombies(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:zombies)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create zomby" do
    assert_difference('Zombie.count') do
      post :create, :zomby => @zomby.attributes
    end

    assert_redirected_to zomby_path(assigns(:zomby))
  end

  test "should show zomby" do
    get :show, :id => @zomby.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @zomby.to_param
    assert_response :success
  end

  test "should update zomby" do
    put :update, :id => @zomby.to_param, :zomby => @zomby.attributes
    assert_redirected_to zomby_path(assigns(:zomby))
  end

  test "should destroy zomby" do
    assert_difference('Zombie.count', -1) do
      delete :destroy, :id => @zomby.to_param
    end

    assert_redirected_to zombies_path
  end
end
