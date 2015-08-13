class AddEmailAndRottingToZombies < ActiveRecord::Migration
  def self.up
    add_column :zombies, :email, :string
    add_column :zombies, :rotting, :boolean, :default => false
  end

  def self.down
    remove_column :zombies, :rotting
    remove_column :zombies, :email
  end
end
