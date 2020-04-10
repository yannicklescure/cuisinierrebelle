json.data do
  if user_signed_in?
    json.user do
      json.auth current_user, :email, :slug, :name, :image, :checked
      if current_user.likes.any?
        json.likes current_user.likes do |like|
          json.extract! like, :recipe_id
        end
      end
      if current_user.bookmarks.any?
        json.bookmarks current_user.bookmarks.order('created_at DESC') do |bookmark|
          json.extract! bookmark, :recipe_id, :created_at
        end
      end
      if current_user.recipes.any?
        json.recipes current_user.recipes do |recipe|
          json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :photo, :likes_count
        end
      end
    end
  end
  json.recipes do
    json.array! @recipes do |recipe|
      json.extract! recipe, :id, :slug, :title, :subtitle, :video, :direction, :description, :photo, :likes_count
      json.user do
        json.extract! recipe.user, :id, :slug, :name, :image, :checked
      end
      if recipe.comments.any?
        json.comments recipe.comments do |comment|
          json.extract! comment, :id, :content
          if comment.replies.any?
            json.replies comment.replies do |reply|
              json.extract! reply, :id, :content
            end
          end
        end
      end
    end
  end
end
